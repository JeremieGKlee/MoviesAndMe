import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'


class FilmDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    componentDidMount() {
        // console.log("Component FilmDetail monté")
        getFilmDetailFromApi(this.props.route.params.idFilm).then(
            data => {
                this.setState({
                    film: data,
                    isLoading: false
                })
            }
        )
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

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id ===
            this.state.film.id) !== -1) {
                //film déjà dans les favoris
                sourceImage = require('../Images/ic_favorite.png')
            }
            return (
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                />
            )
    }

    render() {
        console.log(this.props)
        // console.log("Component FilmDetail rendu")
        // console.log(this.props.route.params.idFilm)
        return(
            <View style = {styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {/* <Text>Détail du film {this.props.route.params.idFilm}</Text> */}
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
    }
  })

  const mapStateToProps = (state) => {
      return {
        favoritesFilm: state.favoritesFilm
      }
  }

export default connect(mapStateToProps)(FilmDetail)