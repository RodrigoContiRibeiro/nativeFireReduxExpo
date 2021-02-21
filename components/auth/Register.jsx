import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onRegister = () => {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
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
          placeholder="Nome"
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
        />
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

        <Button onPress={() => this.onRegister()} title="Registrar" />
      </View>
    );
  }
}
export default Register;
