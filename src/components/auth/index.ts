import firebase from "firebase/app";
import "firebase/auth";
import { auth } from "@/firebaseDatabase";
import { ref } from "vue";
import authValues from "@/components/auth/interface";
import { data } from "@/firebase-errors.json";
import { userColection } from "./db";
import router from "@/router";

export const user = ref<firebase.User | null>(null);
export const email = ref<string | null>(null);
export const password = ref<string | null>(null);

export const initialised = ref<boolean>(false);

export const errorMessage = ref<string | null>(null);

export const showForgotPopUp = ref<boolean>(false);

auth.onAuthStateChanged((u) => {
  // ...
  initialised.value = true;
});

auth.onAuthStateChanged((u) => {
  user.value = u;
  if (u) {
    router.push("/dashboard");
  } else {
    router.push("/auth");
  }
});

export async function logout(): Promise<void> {
  await auth.signOut();
}

export async function google(): Promise<void> {
  await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function getValueByKey(obj: { [key: string]: string }, key: string): string {
  return obj[key];
}

export async function login(email: string, password: string): Promise<void> {
  //   console.log(email, password);
  try {
    const resp = await auth.signInWithEmailAndPassword(email, password);

    if (!resp.user) throw Error("No user");

    user.value = resp.user;
  } catch (error) {
    errorMessage.value = getValueByKey(data, error.code);
  }
}

export async function signup(payload: authValues): Promise<void> {
  console.log(payload);

  const creds = await auth.createUserWithEmailAndPassword(
    payload.email,
    payload.password
  );

  if (!creds.user) throw Error("Signup failed");

  user.value = creds.user;

  userColection.doc(creds.user.uid).set({
    email: creds.user.email,
    name: payload.name,
    surname: payload.surname,
    dni: payload.dniNie,
    workplace: payload.workplace,
    schedule: "40",
    eatHour: true,
    author: creds.user.uid,
  });

  const actionCodeSettings = {
    url: `${process.env.VUE_APP_HOST_NAME}auth/?email=${user.value.email}`,
  };
  user.value.sendEmailVerification(actionCodeSettings);
}

export async function resetPassword(email: string): Promise<void> {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .catch((e) => console.log(e.message));
}

// const actions = {
//   setUser: context => {
//     context.commit("SET_USER");
//   },
//   async signUpAction({ dispatch }, payload) {
//     await firebase
//       .auth()
//       .createUserWithEmailAndPassword(payload.email, payload.password)
//       .then(() => {
//         const user = firebase.auth().currentUser;
//         const actionCodeSettings = {
//           url: `${process.env.VUE_APP_HOST_NAME}sign-in/?email=${user.email}`,
//         };
//         user.updateProfile({
//           displayName: payload.name,
//         });
//         user.sendEmailVerification(actionCodeSettings);
//         window.localStorage.setItem("uid", user.uid);
//         window.localStorage.setItem("displayName", user.displayName);
//         window.localStorage.setItem("email", user.email);
//         window.localStorage.setItem("picture", user.photoURL);
//         firebase
//           .firestore()
//           .collection("attendanceUsers")
//           .doc(user.uid)
//           .set({
//             email: user.email,
//             name: payload.name,
//             surname: payload.surname,
//             dni: payload.dni,
//             workplace: payload.workplace,
//             schedule: "40",
//             eatHour: true,
//             author: user.uid,
//           });
//       })
//       .catch(error => {
//         dispatch(
//           "notifi/showNotification",
//           {
//             notificationMessage: data[error.code],
//             notificationType: "warning",
//           },
//           { root: true }
//         );
//       });
//   },
//   async signInAction({ dispatch }, payload) {
//     await firebase
//       .auth()
//       .signInWithEmailAndPassword(payload.email, payload.password)
//       .then(res => {
//         if (!res.user.emailVerified) {
//           const actionCodeSettings = {
//             url: `${process.env.VUE_APP_HOST_NAME}sign-in/?email=${res.user.email}`,
//           };
//           res.user.sendEmailVerification(actionCodeSettings);
//           dispatch(
//             "notifi/showNotification",
//             {
//               notificationMessage:
//                 "Verificado tu dirección de correo electrónico!",
//               notificationType: "warning",
//             },
//             { root: true }
//           );
//           dispatch("signOut");
//         }
//         window.localStorage.setItem("uid", res.user.uid);
//         window.localStorage.setItem("displayName", res.user.displayName);
//         window.localStorage.setItem("email", res.user.email);
//         window.localStorage.setItem("picture", res.user.photoURL);
//       })
//       .catch(error => {
//         dispatch(
//           "notifi/showNotification",
//           {
//             notificationMessage: data[error.code],
//             notificationType: "warning",
//           },
//           { root: true }
//         );
//       });
//   },
//   signOut() {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         window.localStorage.removeItem("uid");
//         window.localStorage.removeItem("displayName");
//         window.localStorage.removeItem("email");
//         window.localStorage.removeItem("picture");
//       });
//   },
//   resetPassword(_, email) {
//     firebase.auth().sendPasswordResetEmail(email);
//   },
// };
