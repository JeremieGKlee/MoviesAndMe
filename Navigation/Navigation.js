import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, Image } from 'react-native'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'

import Test from '../Components/Test'

const Stack = createStackNavigator();

export function StackNavigation() {
    return (
      
        <Stack.Navigator>
          <Stack.Screen name="Search"
           component={Search}
           options={{ title: 'Rechercher' }}
          />
          <Stack.Screen name="FilmDetail"
           component={FilmDetail}
          />
        </Stack.Navigator>
      
    );
}

const FavoritesStack = createStackNavigator();

export function FavoriteStackNavigation() {
    return (
      
        <FavoritesStack.Navigator>
          <FavoritesStack.Screen name="Favorites"
           component={Favorites}
           options={{ title: 'Favoris' }}
          />
          <FavoritesStack.Screen name="FilmDetail"
           component={FilmDetail}
          />
        </FavoritesStack.Navigator>
      
    );
}

const Tab = createBottomTabNavigator();


export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      tabBarOptions= {{
        activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
        inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
        showLabel: false, // On masque les titres
        showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
      }}>

        <Tab.Screen name="Test"
         component={Test}
        />

        <Tab.Screen name="Search"
         component={StackNavigation}
         options={{ 
           tabBarIcon: () => {
            //on defini le rendu de nos icones par les images recemment ajoutées au projet
            return <Image
              source={require('../Images/ic_search.png')}
              style={styles.icon}/>
              //on applique un style pour les redimensionner comme il faut
            }
          }}
        />
        <Tab.Screen name="Favorites"
         component={FavoriteStackNavigation}
         options={{
            tabBarIcon: () => {
              return <Image
              source={require('../Images/ic_favorite.png')}
              style={styles.icon}/>
            } 
         }}
         
    
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

// import { createStackNavigator } from 'react-navigation-stack'
// import { createAppContainer } from 'react-navigation'
// import Search from '../Components/Search'
// import FilmDetail from '../Components/FilmDetail'

// const SearchStackNavigator = createStackNavigator({
//   Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
//     screen: Search,
//     navigationOptions: {
//       title: 'Rechercher'
//     }
//   },
//   FilmDetail: { //Encore une fois on met le nom que l'on veut
//     screen: FilmDetail
//   }
// })
// export default createAppContainer(SearchStackNavigator)