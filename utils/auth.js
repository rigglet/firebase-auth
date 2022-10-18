import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, updateProfile } from "firebase/auth";
//import { useRouter } from "next/router";

//Auth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const SignIn = async (username, password) => { 
  
  await signInWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    console.log(userCredential.user)
    return true;
  })
  .catch((err) => {
    console.log(err)
    return false
  })
}

export const SignUp = async (username, password) => { 
  
  await createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      console.log(userCredential.user)
      return true;
    })
    .catch((err) => {
      console.log(err)
      return false
    })
  }
  
  export const GoogleLogin = async () => {
    try { 
      const result = await signInWithPopup(auth, googleProvider);
    }
    catch (error) {
      console.log(error)
    }
  }
  
  export const FacebookLogin = async () => {
    //const router = useRouter();
  try { 
    const result = await signInWithPopup(auth, facebookProvider);
    const credentials = FacebookAuthProvider.credentialFromResult(result);
    const token = credentials.accessToken;
    let photoURL = result.user.photoURL + '?height=500&access_token=' + token;
    await updateProfile(auth.currentUser, {photoURL: photoURL})
    //router.push('../dashboard')
  }
  catch (error) {
    console.log(error)
  }
}