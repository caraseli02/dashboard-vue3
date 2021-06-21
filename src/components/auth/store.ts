import firebase from "firebase/app";
import "firebase/auth";
import { ref } from "vue";
import { auth } from "@/firebaseDatabase";
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

const emailRules = function (email: string) {
  const pattern = /^\w+@apimosa.es$/;
  return !pattern.test(email) && email !== "vladwebapp@gmail.com";
};

export async function login(
  email: string,
  password: string
): Promise<void | string> {
  if (emailRules(email)) {
    return (errorMessage.value = "Solo se acceptan corros de @apimosa");
  }
  try {
    const resp = await auth.signInWithEmailAndPassword(email, password);

    if (!resp.user) throw Error("No user");

    user.value = resp.user;
  } catch (error) {
    errorMessage.value = getValueByKey(data, error.code);
  }
}

export async function signup(payload: Record<string, any>): Promise<void> {
  try {
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
      dni: payload.dni,
      workplace: payload.workplace,
      schedule: "40",
      eatHour: true,
      author: creds.user.uid,
    });

    const actionCodeSettings = {
      url: `${process.env.VUE_APP_HOST_NAME}auth/?email=${user.value.email}`,
    };
    user.value.sendEmailVerification(actionCodeSettings);
  } catch (error) {
    errorMessage.value = getValueByKey(data, error.code);
  }
}

export async function resetPassword(email: string): Promise<void> {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .catch((e) => console.log(e.message));
}
