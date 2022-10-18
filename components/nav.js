import { useState } from "react";
import Link from "next/Link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@material-tailwind/react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import { HiOutlineTicket } from "react-icons/hi";
import { MdLogout } from "react-icons/md"

export default function Nav() {
    
    const [user, loading] = useAuthState(auth);
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);

    const handleOpenLogin = () => {
        setOpenLogin(!openLogin);
    };
    const handleOpenSignup = () => {
        setOpenSignup(!openSignup);
    };
    const signout = () => {
        auth.signOut(auth).then(() => {
        }).catch((error) => {
            console.log(err.code, err.message);
        });
    };
    
    return (
        <nav className="flex justify-between items-center py-2 px-4 bg-blue-gray-600 w-screen w-full b-2">
            <div className="flex justify-start gap-x-3 items-center w-1/4">
                <Link href={"/"} >
                    <HiOutlineTicket size="2.5rem" />
                </Link>
                <h1 className="text-2xl font-bold">FAR QUEUE</h1>
            </div>

                
            {/* {!user && (
                <Link href={"/auth/login"}>
                <Button variant="gradient">Join Now</Button>
                </Link>
            )} */}
                
            <ul className="flex w-full items-center justify-end gap-x-8">
                {user && (
                    <div className="flex w-auto justify-evenly items-center gap-x-2">
                        <h2>{ user.displayName}</h2>
                        {/* <h2>{ user.email}</h2> */}
                        <Link href={"/dashboard"}>
                                <img alt="avatar" referrerPolicy="no-referrer" src={user.photoURL} className="p-0 border-2 border-slate-700 border-solid rounded-full w-14 cursor-pointer" />
                        </Link>
                    </div>
                )}
                
                <div className="flex items-center gap-x-2 justify-end">
                    {user && (
                        <Button onClick={signout} variant="filled" color="red" className="flex gap-x-2 items-center">
                            Sign out <MdLogout size="15px"/>
                        </Button>
                    )}
                    {!user && (
                        <>
                        <Button onClick={handleOpenLogin} variant="gradient" color="white">Sign in</Button>
                        <Button onClick={handleOpenSignup} variant="outlined" color="white">Sign up</Button>
                        </>
                    )}
                </div>
                <SignUpModal open={openSignup} handleOpen={handleOpenSignup} setOpenSignup={setOpenSignup} />
                <SignInModal open={openLogin} handleOpen={handleOpenLogin} setOpenLogin={setOpenLogin}/>
            </ul>
        </nav>
    )
}