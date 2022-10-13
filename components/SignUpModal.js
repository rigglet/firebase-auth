import {useState} from "react"
import { SignUp, FacebookLogin, GoogleLogin } from "../utils/auth";
import { FcGoogle } from "react-icons/fc"
import {AiFillFacebook} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"
import { MdPassword } from "react-icons/md"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

import { useRouter } from "next/router";
 
export default function SignUpModal({ handleOpen, open, setOpenSignup }) {
 
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  if (user) {
    setOpenSignup(false);
  }

  const handleSignUp = (e) => {
    if (SignUp(username, password))
    {
      setUsername(()=>"")
      setPassword(()=>"")
      setOpenSignup(!open)
      router.push('/dashboard')
    }
  }
  const handleGoogleLogin = (e) => {
    if (GoogleLogin())
    {
      setUsername(()=>"")
      setPassword(()=>"")
      setOpenSignup(!open)
      router.push('/dashboard')
    }
  }
  const handleFacebookLogin = (e) => {
    if (FacebookLogin())
    {
      setUsername(()=>"")
      setPassword(()=>"")
      setOpenSignup(!open)
      router.push('/dashboard')
    }
  }
  
  return (
    <>
      <Dialog open={open} handler={handleOpen} animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }} className="bg-gray-100">
        <DialogHeader>Sign Up</DialogHeader>
        <DialogBody divider className="flex flex-col flex-grow gap-y-4 items-center">
          <form className="flex flex-col flex-grow gap-y-4">
            <Input onChange={(e)=>setUsername(e.target.value)} name="username" value={username} className="text-2xl" label="Email address" icon={<FaUserAlt />} />
            <Input onChange={(e)=>setPassword(e.target.value)} name="password" value={password} className="text-2xl" label="Choose password" icon={<MdPassword />} type="password"/>
          </form>
          <h4 className="font-bold">-- or --</h4>
          <div className="flex flex-col gap-4">
            <button onClick={handleGoogleLogin} className="flex justify-center items-center w-full p-5 text-2xl gap-x-10 text-white bg-gray-700 font-medium rounded-lg">
                <FcGoogle />Sign in with Google
            </button>
            <button onClick={handleFacebookLogin} className="flex justify-center items-center w-full p-5 text-2xl gap-x-10 text-white bg-gray-700 font-medium rounded-lg">
                <AiFillFacebook className="text-blue-300" />Sign in with Facebook
            </button>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-x-2">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSignUp}>
            <span>Sign up</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}