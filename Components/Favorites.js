

import React from 'react'
import { StyleSheet, Text } from 'react-native'

class Favorites extends React.Component {

  render() {
    return (
      <Text style={styles.main_container}>Mes Favoris</Text>
    )
  }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
      },
})

export default Favorites