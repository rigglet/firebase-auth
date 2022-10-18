import { database } from "./firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
//import { auth } from "../utils/firebase";
//import { useAuthState } from "react-firebase-hooks/auth";

export const getUserEvents = async () => {
    
    const querySnapshot = await getDocs(collection(database, "events",)).then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err);
    })
    return querySnapshot;
    
}