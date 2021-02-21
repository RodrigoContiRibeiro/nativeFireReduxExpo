import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onRegister = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />

        <Button onPress={() => this.onRegister()} title="Entre" />
      </View>
    );
  }
}

export default Login;
