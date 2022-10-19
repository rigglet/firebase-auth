
import { database } from "../../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
    //const [user, loading] = useAuthState(auth);
    console.log(req.body.Location)
    const { method } = req
    const { Name, Attendees, Location, Owner } = req.body
    
    switch (method) {
        case 'GET':
        // Get data from your database    
        res.status(200).json("hi")
        break
        case 'POST':
        // Update or create data in your database
               
        await addDoc(collection(database, "events"), {
                "Name": Name,
                "Owner": Owner,
                "Attendees": Attendees,
                "Location": Location
        }).then(result => {
            res.status(200).send(result);
        }).catch(error => {
            res.status(500).send(error)
        })
        
        break
        default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}