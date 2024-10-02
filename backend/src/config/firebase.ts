import fs from "fs";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const serviceAccount: ServiceAccount = JSON.parse(
  fs.readFileSync("teste-97294-firebase-adminsdk-zmrtv-deddc50281.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teste-97294-default-rtdb.firebaseio.com",
});

const firebaseConfig = {
  apiKey: "AIzaSyC-DYBrYbpjYl_JCqkTqQCsTL3WvxAT6TE",
  authDomain: "teste-97294.firebaseapp.com",
  databaseURL: "https://teste-97294-default-rtdb.firebaseio.com",
  projectId: "teste-97294",
  storageBucket: "teste-97294.appspot.com",
  messagingSenderId: "113656297566",
  appId: "1:113656297566:web:39ad82c1d875d287e85ccf",
  measurementId: "G-13V9HNGQEG",
};

const authAdmin = admin.auth();
const db = admin.firestore();

const app = initializeApp(firebaseConfig);
const AuthClient = getAuth(app);

export { app, db, authAdmin, AuthClient };
