import { database } from "../../../utils/firebase";
import { collection, getDocs} from "firebase/firestore";
//import { auth } from "../utils/firebase";
//import { useAuthState } from "react-firebase-hooks/auth";

export default async function handler(req, res) {
    
    await getDocs(collection(database, "events")).then((result) => {
         
        let arrData = [];
        result.forEach((doc) => {
        arrData.push(doc.data())
        });

        res.status(200).json(JSON.parse(JSON.stringify(arrData)))
    })
    .catch((err) => {
        console.log(err);
        return err
    })
}