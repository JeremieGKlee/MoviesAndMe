import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'


class FilmDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    if (params.film != undefined && Platform.OS === 'ios') {
      return {
          headerRight: <TouchableOpacity
                          style={styles.share_touchable_headerrightbutton}
                          onPress={() => params.shareFilm()}>
                          <Image
                            style={styles.share_image}
                            source={require('../Images/ic_share.png')} />
                        </TouchableOpacity>
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
      isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
    }

    this._toggleFavorite = this._toggleFavorite.bind(this)
    this._shareFilm = this._shareFilm.bind(this)
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

    // componentDidMount() {
    //     // console.log("Component FilmDetail monté")
    //     getFilmDetailFromApi(this.props.route.params.idFilm).then(
    //         data => {
    //             this.setState({
    //                 film: data,
    //                 isLoading: false
    //             })
    //         }
    //     )
    // }

    componentDidMount() {
      const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item =>
         item.id === this.props.route.params.idFilm)
      if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
        // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
        this.setState({
          film: this.props.favoritesFilm[favoriteFilmIndex]
        })
        return
      }
      // Le film n'est pas dans nos favoris, on n'a pas son détail
      // On appelle l'API pour récupérer son détail
      this.setState({ isLoading: true })
      getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false
        }, () => {this._updateNavigationParams() })
      })
    }

    componentDidUpdate() {
        console.log("componentDidUpdate : ")
        console.log(this.props.favoritesFilm)
    }
    
    _displayLoading() {
        if (this.state.isLoading) {
            // si isLoading vaut true on affiche le chargement
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _toggleFavorite() {
        //Définition de notre action ici
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film}
        this.props.dispatch(action)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        var shouldEnlarge = false // Par default, si le film n'est pas en favori, on veut qu'au
        //clic sur le bouton, celui-ci s'agrandisse=> shouldEnlarge à true
        if (this.props.favoritesFilm.findIndex(item => item.id ===
            this.state.film.id) !== -1) {
                //film déjà dans les favoris
                sourceImage = require('../Images/ic_favorite.png')
                shouldEnlarge = true // Si le film est dans les favoris, on veut qu'au clic sur
                // le bouton, celui-ci se rétrécisse => shouldEnlarge à false
            }
            return (
              <EnlargeShrink
                shouldEnlarge={shouldEnlarge}>
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                />
              </EnlargeShrink>
            )
    }

    _displayFilm() {
      const { film } = this.state
      if (film != undefined) {
        return (
          <ScrollView style={styles.scrollview_container}>
            <Image
              style={styles.image}
              source={{uri: getImageFromApi(film.backdrop_path)}}
            />
            <Text style={styles.title_text}>{film.title}</Text>
            <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            <Text style={styles.description_text}>{film.overview}</Text>
            <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
            <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
            <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
            <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
            <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                return genre.name;
              }).join(" / ")}
            </Text>
            <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                return company.name;
              }).join(" / ")}
            </Text>
          </ScrollView>
        )
      }
    }

    _shareFilm() {
      const { film } = this.state
      Share.share({ title: film.title, message: film.overview })
    }

    _displayFloatingActionButton() {
      const { film } = this.state
      if (film != undefined && Platform.OS === 'android') {
        //uniquement sur android et lorsque le film est chargé
        return (
          <TouchableOpacity
            style={styles.share_touchable_floatingactionbutton}
            onPress={() => this._shareFilm()}>
            <Image
              style={styles.share_image}
              source={require('../Images/ic_share.png')} />
            </TouchableOpacity>
        )
      }
    }

    render() {
        // console.log(this.props)
        // console.log("Component FilmDetail rendu")
        // console.log(this.props.route.params.idFilm)
        return(
            <View style = {styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {/* <Text>Détail du film {this.props.route.params.idFilm}</Text> */}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    scrollview_container: {
      flex: 1
    },
    image: {
      height: 169,
      margin: 5
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 15
    },
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center', // alignement des components enfants sur l'axe secondaire, X
    },

    favorite_image: {
      flex: 1,
      width: null,
      height: null

    },
    share_touchable_floatingactionbutton: {
      position: 'absolute',
      width: 60,
      height: 60,
      right: 30,
      bottom: 30,
      borderRadius: 30,
      backgroundColor: '#e91e63',
      justifyContent: 'center',
      alignItems: 'center'
    },
    share_touchable_headerrightbutton: {
      marginRight: 8
    },
    share_image: {
      width: 30,
      height: 30
    }
  })

  const mapStateToProps = (state) => {
      return {
        favoritesFilm: state.favoritesFilm
      }
  }

export default connect(mapStateToProps)(FilmDetail)