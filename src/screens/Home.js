import React from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TextInput
} from 'react-native';
import { image } from '../assets/images'
import Cart from '../components/cart'
import ListBook from '../components/list-book'
import InputQTY from '../components/input-qty'
import StorageUtils from '../utils/Storage'

const { width } = Dimensions.get('window')

export default class Home extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          total:0,
          inputName:''
      }
  }

  //Life cycle react-native
  UNSAFE_componentWillMount = () => {
    console.log('componentWillMount')
  }

  shouldComponentUpdate = (props, state) => {
    console.log('shouldComponentUpdate, current state = ', state)
    return true
  }

  UNSAFE_componentWillUpdate = () => {
    console.log('componentWillUpdate')
  }

  componentDidUpdate = () => {
    console.log('componentDidUpdate')
  }

  incrementItem = () => {
    this.setState({ total: ++this.state.total })
  }

  decrementItem = () => {
    this.setState({ total: this.state.total == 0 ? 0 : --this.state.total  })
  }

  passDataToDetail = (data) => {
    this.props.navigation.navigate('DetailBook',{
      name:data
    })
  }

  getToken = async () => {
    const token = await StorageUtils.getToken()
    return token
  }

    render() {

    //RENDER FLATLIST COMPONENT
    // return (
    //   <ListBook 
    //   items={['Google Education', 'Steve Job', 'Topik Mujianto']}
    //   />
    // )

    //RENDER BOX FLEXBOX
    // return(
    //   <View style={styles.container}> 
    //      <View style={[styles.box,{backgroundColor: 'blue', flexShrink:2}]}/>
    //      <View style={[styles.box,{backgroundColor: 'red'}]}/>
    //      <View style={[styles.box,{backgroundColor: 'green'}]}/>
    //      <View style={[styles.box,{backgroundColor: 'black', flexShrink: 150}]}/>
    //   </View>
    // )


    //RENDER UPDATE CART
    // return(
    //   <View>
    //      <TouchableOpacity
    //      onPress={this.incrementItem}
    //      >
    //        <Text>+</Text>
    //      </TouchableOpacity>
    //   </View>
    // )

    // RENDER COMPONENT (props & state)
    // return (
    //   <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
    //     <InputQTY
    //       incrementItem={this.incrementItem}
    //       decrementItem={this.decrementItem}
    //       itemName={'Indomie'}
    //     />
    //   <Cart count={this.state.total}/>
    //   </View>
    // );

    //RENDER DIFFERENT PLATFORM
    return(
      <View 
        style={[
          styles.container,
          {
            justifyContent:'center', 
            alignItems:'center'
          }
        ]}>
        <Image
         style={styles.imageStyle}
         source={image.osLogo}/>
         <Text>{Platform.OS === 'ios' ? 'iOS FANBOY' : 'ANDROID FANBOY'}</Text>
      </View>
    )

    //RENDER PASS DATA TO DETAIL
    // return(
    //   <View style={[styles.container,{justifyContent:'center',alignItems:'center'}]}>
    //     <TextInput 
    //       placeholder={'input your name'}
    //       onChangeText={(text=>{
    //         this.setState({inputName: text})
    //       })}
    //       style={{
    //         borderBottomColor:'gray',
    //         borderBottomWidth:1
    //       }}
    //     />
    //     <TouchableOpacity
    //     onPress={()=>this.passDataToDetail(this.state.inputName)}
    //     >
    //       <Text>to Details</Text>
    //     </TouchableOpacity>
    //   </View>
    // )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection:'row',
    flexWrap:'wrap'
    // ...Platform.select({
    //   ios:{
    //     backgroundColor: '#e74c3c',
    //   },
    //   android:{
    //     backgroundColor:'#e67e22'
    //   }
    // })
  },
  box: {
    flexShrink:1,
    height: 100,
    width: 150
  },
  imageStyle:{
    width:100,
    height: 100,
    alignSelf:'center',
    resizeMode:'contain'
  }
})