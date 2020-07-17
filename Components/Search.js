

import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js
import { connect } from 'react-redux'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText= "" // Initialisation de notre donnée searchedText en dehors du state
        this.page = 0 //Coimpteur pour connaître la page courante
        this.totalPages = 0 // nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
        this.state = {
            films:[],
            isLoading: false //par défaut à false tant qu'on lance rien
        }
    }
    
    _loadFilms() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
              // this.page ++    
              this.setState({ isLoading: true })  // lancement du téléchargement
              getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [ ...this.state.films, ...data.results ],   // correspond à films: this.state.films.concat(data.results) en non ES6 
                    isLoading: false // Arrêt du chargement
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    }

    _searchFilms() {
      console.log("searchFilms")
      // ici on va remettre à zero les film de notre state
      this.page = 0
      this.totalPages = 0
      this.setState({
        films :[],
      }, () => {
        // utilisation du paramétre length sur le tableau de film pour vérifier qu'il y a bien 0 film
      // console.log("Page : " + this.page + " / TotalPages : " + this.totalPages +
      //  " / Nombre de films : " + this.state.films.length)
            this._loadFilms()
      })
    }

    _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
          </View>
        )
      }
    }

    render() {
        // console.log(this.props)
        return (
        <View style={styles.main_container}>
            <TextInput
             style={styles.textinput}
             placeholder='Titre du film'
             onChangeText={(text) => this._searchTextInputChanged(text)}
             onSubmitEditing={() => this._searchFilms()} 
            />
            <Button title='Rechercher' onPress={() => this._searchFilms()}/>
            <FilmList
              films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
              navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
              loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
              page={this.page}
              totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
            />
            
            {this._displayLoading()}
        </View>
        )
    }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    // marginTop: 20 plus necessaire car fait par le StackNavigator
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default Search