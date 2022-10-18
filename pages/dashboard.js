import { useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../utils/firebase"
import { Breadcrumbs } from "@material-tailwind/react";
import { FaHome } from "react-icons/fa";
import {getUserEvents} from "../utils/database"

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import CreateEventModal from "../components/CreateEventModal";

export default function Dashboard({data}) {

  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [openCreate, setOpenCreate] = useState(false);

  //console.log(user.uid);
  // const handleNewEvent = () => {
  //   setOpenCreate(!openCreate);
  // }
  const handleCreateEvent = () => {
    console.log("creating event");
  }
        
    if (loading) return (<h1>Loading...</h1>)
    if(!user){ route.push('/')}
    if (user)
    {
      return (
        <div className="p-8 flex flex-col gap-8 items-start align-start w-full">
          <CreateEventModal openCreate={openCreate} setOpenCreate={setOpenCreate} handleCreateEvent={handleCreateEvent}/>
            <Breadcrumbs separator="/">
                <a href="/" className="opacity-80">
                    <FaHome />                    
                </a>
                <a href="/dashboard" className="opacity-80">
                    <span>Dashboard</span>
                </a>
            </Breadcrumbs>
            
            <h1 className="">Welcome to your dashboard, <span className="font-bold text-pink-600 text-xl" > {user?.displayName}</span></h1>
            
            <Button variant="gradient" color="green" onClick={()=>setOpenCreate(!openCreate)}>
              <span>Create event</span>
            </Button>
            <h2>Here are your current events:</h2>

            <div className="flex gap-8 w-full h-auto flex-wrap">

            {
              data.map((doc) => {
                return (
                  

                  <div className="rounded-lg bg-gradient-to-br from-yellow-800 via-purple-700 via-pink-600 to-indigo-500 p-1 basis-1/3 grow">
                  <div className="flex flex-col p-8 rounded-lg text-blue-gray-50 gap-2 bg-black">
                    <div>
                      <h2 className="font-bold">Event Name: </h2>
                      <p className="">{ doc.Name }</p>
                    </div>
                    <div>
                      <h2 className="font-bold">Location: </h2>
                      <div className="flex gap-2">
                        <h3 className="font-semibold">Long: </h3>
                        <p className="">{ doc.Location.longitude }</p>
                        <h3 className="font-semibold">Lat: </h3>
                        <p className="">{ doc.Location.latitude }</p>
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold">Owner: </h2>
                      <p className="">{ doc.Owner }</p>
                    </div>
                    <div>
                      <h2 className="font-bold">Maximum attendees: </h2>
                      <p className="">{ doc['Max no of attendees'] }</p>
                    </div>
                   </div>
                   </div>
                    
                )
              })
            }
            </div>
        </div>
    )}
}

// This gets called on every request
export async function getServerSideProps() {
  
  const data = await getUserEvents().then((querySnapshot) => { 
    
    let arrData = [];
    
    querySnapshot.forEach((doc) => {
      arrData.push(doc.data())
      //console.log(doc.id, " => ", doc.data());
    });
    
    return JSON.parse(JSON.stringify(arrData))
  })

  // Pass data to the page via props
  return { props: { data } }
}