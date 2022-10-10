import Link from "next/Link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../utils/firebase"


export default function Nav() {
    
    const [user, loading] = useAuthState(auth);
    
    return (
        <nav className="flex justify-between items-center py-10">
            <Link href={"/"}>Logo</Link>
            <ul>
                {!user && (
                    <Link href={"/auth/login"}>
                        <a className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium ml-8">Join Now</a>
                    </Link>
                )}
                {user && (
                    <div className="flex w-2/4 justify-evenly items-center gap-4">
                        <Link href={"/dashboard"}>
                                <img alt="avatar" referrerPolicy="no-referrer" src={user.photoURL} className="p-0 border-4 border-slate-700 border-solid rounded-full w-20 cursor-pointer" />
                        </Link>
                        <h2>{ user.displayName}</h2>
                        <h2>{ user.email}</h2>
                    </div>
                )}
            </ul>
        </nav>
    )
}