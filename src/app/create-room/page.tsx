import { CreateRoomForm } from './create-room-form';

export default function CreateRoomPage(){
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-8 pt-10">
            <h1 className="text-4xl font-bold">Create Room</h1>

            <CreateRoomForm />
        </div>
    )
}