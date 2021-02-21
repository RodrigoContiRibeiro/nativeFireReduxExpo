import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { View, Text } from "react-native";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";

import rootReducer from "./redux/reducers/rootReducer.js";

const store = createStore(
  rootReducer,
  compose(applyMiddleware(ReduxThunk))
 /*  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ) */
);

import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCVLsdnKE-MMTluLeRhNUnN4UTPxqgJzyg",
  authDomain: "nativefirereduxexpo.firebaseapp.com",
  projectId: "nativefirereduxexpo",
  storageBucket: "nativefirereduxexpo.appspot.com",
  messagingSenderId: "91244162271",
  appId: "1:91244162271:web:05eaf902b0b45008d94d6a",
  measurementId: "G-9941FBPS67",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import Landing from "./components/auth/Landing.jsx";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import Main from "./components/Main.jsx";
import Add from "./components/main/Add.jsx";


const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View
          style={{
            flex: "1",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Text>Carregando...</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Adicionar"
              component={Add}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
