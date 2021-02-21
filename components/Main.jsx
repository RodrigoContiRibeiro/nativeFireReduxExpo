import React, { Component } from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Feed from "./main/Feed.jsx";
import Add from "./main/Add.jsx";
import Profile from "./main/Profile.jsx";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUsers } from "../redux/actions/fetchUsers";

const Tab = createMaterialBottomTabNavigator();

const EmptyComp = () =>{
  return(null)
}

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={EmptyComp}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Adicionar")
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Configurações"
          component={View}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
