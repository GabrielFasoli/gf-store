import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import { auth } from "./config.js";

const provider = new GoogleAuthProvider();

const isMobile = () => window.innerWidth <= 768;

export const loginWithGoogle = () => {
  if (isMobile()) {
    return signInWithRedirect(auth, provider);
  }
  return signInWithPopup(auth, provider);
};

export const logout = () => signOut(auth);

export const checkRedirectResult = () => getRedirectResult(auth);
