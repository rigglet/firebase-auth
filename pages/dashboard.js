import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../utils/firebase"
import { Breadcrumbs } from "@material-tailwind/react";
import { MdLogout } from "react-icons/md"
import { FaHome } from "react-icons/fa";

export default function Dashboard() {

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    if (loading) return (<h1>Loading...</h1>)
    if(!user){ route.push('auth/login')}
    if (user)
    {
        return (
        <div className="p-8 flex flex-col gap-8 items-start align-start w-full">
            <Breadcrumbs separator="/">
                <a href="/" className="opacity-80">
                    <FaHome />                    
                </a>
                <a href="/dashboard" className="opacity-80">
                    <span>Dashboard</span>
                </a>
            </Breadcrumbs>
            
            <h1>Welcome to your dashboard {user?.displayName}</h1>
            
        </div>
    )}
}