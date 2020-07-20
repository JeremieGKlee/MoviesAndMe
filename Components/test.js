// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, Text } from 'react-native'


class Test extends React.Component {

  render() {
    return (
      
      <View style={styles.main_container}>
        { Platform.OS === 'ios' ? <Text>iOS</Text> : <Text>Android</Text> }
        <View style={styles.subview_container}>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Soit on utilise la fonction Platform.select
  // subview_container: {
  //   ...Platform.select({
  //     ios: {
  //       backgroundColor: 'red',
  //       height: 100,
  //       width: 50
  //     },
  //     android: {
  //       backgroundColor: 'blue',
  //       height: 50,
  //       width: 100
  //     }
  //   })
  // },

// Soit on teste la valeur de l'OS

subview_container: {
    backgroundColor: Platform.OS === 'ios' ? 'red' : 'blue',
    height: Platform.OS === 'ios' ? 100 : 50,
    width: Platform.OS === 'ios' ? 50 : 100
}

})  
export default Test