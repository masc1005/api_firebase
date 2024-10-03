import fs from "fs";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

//inserir caminho do arquivo json há função readFileSync
const serviceAccount: ServiceAccount = JSON.parse(fs.readFileSync("", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASEURL,
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const authAdmin = admin.auth();
const db = admin.firestore();

const app = initializeApp(firebaseConfig);
const AuthClient = getAuth(app);

export { app, db, authAdmin, AuthClient };
