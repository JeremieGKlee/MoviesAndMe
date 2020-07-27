

import React from 'react'
import { StyleSheet, View, Platform, Text, Animated, Easing, PanResponder, Dimensions} from 'react-native'
import HelloWorld from './HelloWorld'

class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosition: 0,
      leftPosition: 0,
    }

  var {height, width} = Dimensions.get('window');
  this.panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      let touches = evt.nativeEvent.touches;
      if (touches.length == 1) {
        this.setState({
          topPosition: touches[0].pageY - height/2,
          leftPosition: touches[0].pageX - width/2
        })
      }
    }
  })
}
  
  render() {
    return (
      <View style={styles.main_container}>
        <HelloWorld/>
        <View
          {...this.panResponder.panHandlers}
          style={[styles.animation_view, { top: this.state.topPosition, left:
          this.state.leftPosition }]}>
        </View>
      </View>
    )
  }



  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     topPosition: new Animated.Value(0),
  //     leftPosition: new Animated.Value(0),
  //   }
  // }

  // componentDidMount() {
  //   Animated.parallel([
  //     Animated.spring(
  //       this.state.topPosition,
  //       {
  //         toValue: 100,
  //         tension: 8,
  //         friction: 3
  //       }
  //     ),
  //     Animated.timing(
  //       this.state.leftPosition,
  //       {
  //         toValue: 100,
  //         duration: 1000,
  //         easing: Easing.elastic(2)
  //       }
  //     )
  //   ]).start()
  // }

  // render() {
  //   return (
      
  //     <View style={styles.main_container}>
  //       {/* { Platform.OS === 'ios' ? <Text>iOS</Text> : <Text>Android</Text> } */}
  //       <HelloWorld/>
  //       {/* <View style={styles.subview_container}> */}
  //       {/* <View style={styles.animation_view}>
  //       </View> */}
  //       <Animated.View style={[styles.animation_view, { top:
  //       this.state.topPosition, left: this.state.leftPosition }]}>
  //       </Animated.View>

  //     </View>
  //   )
  // }


  // componentDidMount() {
  //   Animated.sequence([
  //     Animated.spring(
  //       this.state.topPosition,
  //       {
  //         toValue: 100,
  //         tension: 8,
  //         friction: 3
  //       }
  //     ),
  //     Animated.timing(
  //       this.state.topPosition,
  //       {
  //         toValue: 0,
  //         duration: 1000,
  //         easing: Easing.elastic(2)
  //       }
  //     )
  //   ]).start()
  // }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_view: {
      backgroundColor: 'red',
      width: 100,
      height: 100
  }
  // Soit on utilise la fonction Platform.select
  // subview_container: {
  //   ...Platform.select({
  //     ios: {
  //       backgroundColor: 'red',
  //       height: 100,
  //       width: 50
  //     },
  //     android: {
  //       backgroundColor: 'red',
  //       height: 50,
  //       width: 100
  //     }
  //   })
  // },

  


// Soit on teste la valeur de l'OS

// subview_container: {
//     backgroundColor: Platform.OS === 'ios' ? 'red' : 'blue',
//     height: Platform.OS === 'ios' ? 100 : 50,
//     width: Platform.OS === 'ios' ? 50 : 100
// }

})  
export default Test