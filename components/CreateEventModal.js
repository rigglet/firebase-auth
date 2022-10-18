import {useState} from "react"
import {FaUserAlt} from "react-icons/fa"
import {MdPassword} from "react-icons/md"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { CgRename } from "react-icons/cg"
import { ImListNumbered } from "react-icons/im"
import { TbWorldLatitude, TbWorldLongitude } from "react-icons/tb"

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
 
export default function CreateEventModal({ openCreate, setOpenCreate, handleCreateEvent }) {
  
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [max, setMax] = useState(1);
  const [locationLat, setLocationLat] = useState(1);
  const [locationLong, setLocationLong] = useState(1);

  const handleCancel = () => {
    setOpenCreate(()=>!openCreate)
  }
  const handleCreate = () => {
    setName("");
    setMax(1);
    setLocationLat(0);
    setLocationLong(0);
    setOpenCreate(()=>!openCreate)
  }

  return (
    <>
      <Dialog open={openCreate} handler={setOpenCreate} animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }} className="bg-gray-100">
        <DialogHeader>Create New Event</DialogHeader>
        <DialogBody divider className="flex flex-col flex-grow gap-y-4 items-center">
          <h1>Owner: <span className="font-bold text-pink-600 text-xl" > {user?.displayName}</span></h1>
          <form className="flex flex-col flex-grow gap-y-4">
            <Input onChange={(e)=>setName(e.target.value)} name="name" value={name} className="text-2xl" label="Name" icon={<CgRename />} />
            <Input onChange={(e)=>setMax(e.target.value)} name="max" value={max} className="text-2xl" label="Max no. of attendees" type="number" min="1" icon={<ImListNumbered />} />
            <Input onChange={(e)=>setLocationLat(e.target.value)} name="locationLat" value={locationLat} className="text-2xl" label="Location Latitute" type="number" min="0" icon={<TbWorldLatitude />} />
            <Input onChange={(e)=>setLocationLong(e.target.value)} name="locationLong" value={locationLong} className="text-2xl" label="Location Londitude" type="number" min="0" icon={<TbWorldLongitude />} />
          </form>
          
        </DialogBody>
        <DialogFooter className="flex gap-x-2">
          <Button
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleCreate}>
            <span>Create Event</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}