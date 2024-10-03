import { User } from "../dto/users.dto";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app, AuthClient, authAdmin } from "../../config/firebase";

export class UserService {
  static async create(userData: User) {
    try {
      await authAdmin.getUserByEmail(userData.email);

      throw new Error("User already exists");
    } catch (error: any) {
      if (error.code !== "auth/user-not-found") {
        throw new Error(error.message);
      }
    }

    try {
      const user = await createUserWithEmailAndPassword(
        AuthClient,
        userData.email,
        userData.password
      );

      await sendEmailVerification(user.user);

      return user;
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  static async login(email: string, password: string) {
    try {
      const valid = await signInWithEmailAndPassword(
        AuthClient,
        email,
        password
      );

      return {
        accessToken: await valid.user.getIdToken(),
        refreshToken: valid.user.refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error logging in user");
    }
  }

  static async forgetPassword(email: string) {
    await authAdmin.getUserByEmail(email);

    const fireAuth = await sendPasswordResetEmail(AuthClient, email);

    return fireAuth;
  }
}
