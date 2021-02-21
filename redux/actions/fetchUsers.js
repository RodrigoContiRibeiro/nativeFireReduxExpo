import firebase from "firebase";

import { USER_STATE_CHANGE } from "../actionsTypes.js";

export function fetchUsers() {
  return (dispach) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log("Fetched");
          dispach({
            type: USER_STATE_CHANGE,
            currentUser: snapshot.data(),
          });
        } else {
          console.log("Não há");
        }
      });
  };
}
