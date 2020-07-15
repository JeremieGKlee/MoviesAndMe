// import * as React from 'react';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import Search from '../Components/Search'

// const Stack = createStackNavigator();

// export default function Navigation() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" component={Search} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
// }
  


import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: { //Encore une fois on met le nom que l'on veut
    screen: FilmDetail
  }
})
export default createAppContainer(SearchStackNavigator)