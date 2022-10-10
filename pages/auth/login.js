import {useEffect} from 'react'
import { FcGoogle } from "react-icons/fc"
import {AiFillFacebook} from "react-icons/ai"
import {FaTwitter, FaGithub} from "react-icons/fa"
import {GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider, updateProfile} from "firebase/auth"
import { auth } from "../../utils/firebase"
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth"

export default function Login() {
    
    //Auth Providers
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const twitterProvider = new TwitterAuthProvider();

    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    const GoogleLogin = async () => {
        try { 
            const result = await signInWithPopup(auth, googleProvider);
            router.push('../dashboard')
        }
        catch (error) {
            console.log(error)
        }
    }

    const FacebookLogin = async () => {
        try { 
            const result = await signInWithPopup(auth, facebookProvider);
            const credentials = await FacebookAuthProvider.credentialFromResult(result);
            const token = credentials.accessToken;
            let photoURL = result.user.photoURL + '?height=500&access_token=' + token;
            await updateProfile(auth.currentUser, {photoURL: photoURL})
            router.push('../dashboard')
        }
        catch (error) {
            console.log(error)
        }
    }
    const GithubLogin = async () => {
        try { 
            const result = await signInWithPopup(auth, githubProvider);
            router.push('../dashboard')
        }
        catch (error) {
            console.log(error)
        }
    }
    const TwitterLogin = async () => {
        try { 
            const result = await signInWithPopup(auth, twitterProvider);
            router.push('../dashboard')
        }
        catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if (user) {
            router.push('/dashboard')   
        } else {
            console.log(user);
        }
    }, [user])

    return (
        <div className="shadow-xl mt-10 p-10 text-gray-100 rounded-lg bg-slate-500 w-3/6">
            <h2 className="text-3xl font-medium">Join Today</h2>
            <div className="py-4">
                <h3 className="py-4">Sign in with one of the providers</h3>
            </div>
            <div className="flex flex-col gap-4">
                <button onClick={GoogleLogin} className="flex justify-center items-center w-full p-5 text-2xl gap-x-10 text-white bg-gray-700 font-medium rounded-lg">
                    <FcGoogle />Sign in with Google
                </button>
                <button onClick={FacebookLogin} className="flex justify-center items-center w-full p-5 text-2xl gap-x-10 text-white bg-gray-700 font-medium rounded-lg">
                    <AiFillFacebook className="text-blue-300" />Sign in with Facebook
                </button>
                <button onClick={TwitterLogin} className="flex justify-center items-center w-full p-5 text-2xl gap-x-10 text-white bg-gray-700 font-medium rounded-lg">
                    <FaTwitter className="text-blue-300" />Sign in with Twitter
                </button>
                <button onClick={GithubLogin} className="flex justify-center items-center w-full p-5 text-2xl gap-x-10 text-white bg-gray-700 font-medium rounded-lg">
                    <FaGithub className="text-black" />Sign in with Github
                </button>
            </div>
        </div>
    )
}