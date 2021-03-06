import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import CustomInput from '../components/CustomInput';
import API from '../utils/Api';
import StorageUtils from '../utils/Storage'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewBGColor: {
    backgroundColor: 'red'
  },
  defaultText: {
    fontFamily: 'Montserrat-Bold',
    fontSize:18
  }
});

export default class TrainingD2 extends Component {
  constructor(props) {
    super(props);
    const {email} =this.props.navigation.state.params
    this.state = {
      email: email,
      password: '',
      isLoading: false
    };
    this.handleInput = this.handleInput.bind(this);
  }

  // passDataToProfile(username, password){
  //     if(username != undefined && password !=undefined){
  //         this.props.navigation.navigate('Profile',
  //         {username: username, password:password})
  //     }else{
  //         Alert.alert(
  //             'Error',
  //             `${username || password} kosong`,
  //             [
  //               {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //               {
  //                 text: 'Cancel',
  //                 onPress: () => console.log('Cancel Pressed'),
  //                 style: 'cancel',
  //               },
  //               {text: 'OK', onPress: () => {
  //                   this.setState({
  //                       username: null,
  //                       password:null
  //                     })
  //                 }},
  //             ],
  //             {cancelable: false},
  //           );
  //     }
  // }

  handleAlert(message) {
    this.handleInput('isLoading', false);
    Alert.alert(
      'Error',
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState({
              email: null,
              password: null
            });
          }
        }
      ],
      { cancelable: false }
    );
  }

  handleInput(stateKey, value) {
    console.log(value);
    this.setState({ [stateKey]: value });
  }

  handleLogin() {
    const { email, password } = this.state;
    this.handleInput('isLoading', true);
    API.login({ email: email, password: password })
      .then((res) => {
        StorageUtils.setToken(res.data.data.token)
        this.props.navigation.navigate('ListBook')
      })
      .catch((err) => {
       this.handleAlert(err.message)
        console.log(err.message);
      });
  }

  render() {
    const { email, password, isLoading } = this.state;

    if (isLoading) {
      return (<ActivityIndicator size={'large'} />) 
    } else {
      return (
        <View style={styles.container}>
          <CustomInput
            defaultValue={email}
            handleInput={this.handleInput}
            defaultKey="email"
          />
          <CustomInput
            defaultValue={password}
            isSecure={true}
            handleInput={this.handleInput}
            defaultKey="password"
          />
          <TouchableOpacity
          style={{ marginTop:20 }}
            onPress={() => {
              this.handleLogin();
            }}
          >
            <Text style={[styles.defaultText]}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
