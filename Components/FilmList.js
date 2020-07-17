import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          films: []
        }
      }
    
      _displayDetailForFilm = (idFilm) => {
        console.log("Display film " + idFilm)
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
      }
    
      render() {
        return (
            <FlatList
              style={styles.list}
              data={this.props.films}
              extraData={this.props.favoritesFilm}
                // on utilise la prop extraData pour indiquer à la FlatList que d'autres données
                // doivent être prises en compte si on lui demande de se re rendre
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <FilmItem
                  film={item}
                   //Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un coeur ou non
                  isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                  displayDetailForFilm={this._displayDetailForFilm}
                />
              )}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (this.props.page < this.props.totalPages) {
                    // on verifie qu'on a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                  // On appelle la méthode loadFilm du component Search pour charger plus de films
                  this.props.loadFilms()
                }
              }}
            />
        )
      }
    }
    
    const styles = StyleSheet.create({
      list: {
        flex: 1
      }
    })
    
    // On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component FilmList
    const mapStateToProps = state => {
      return {
        favoritesFilm: state.favoritesFilm
      }
    }
    
    export default connect(mapStateToProps)(FilmList)
