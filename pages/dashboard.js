import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../utils/firebase"
import { MdLogout } from "react-icons/md"

export default function Dashboard() {

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    if (loading) return (<h1>Loading...</h1>)
    if(!user){ route.push('auth/login')}
    if (user)
        {return (
        <div>
            <h1>Welcome to your dashboard {user?.displayName}</h1>
            <button onClick={()=>auth.signOut()} className="flex justify-center items-center p-2 text-white bg-gray-700 font-small rounded-lg">
                <MdLogout />Sign out
            </button>
        </div>
    )}
}