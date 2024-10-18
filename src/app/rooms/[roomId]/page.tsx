import { getRoom } from "@/data-access/rooms";
import Link from "next/link";
import { Github } from "lucide-react";
import { LanguageList, splitLang } from './../../../components/language-list';



export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room of Id Found</div>;
  }


  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          Video Player
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>
          <p className="tex-base text-gray-600">{room?.description}</p>

          <LanguageList languages={splitLang(room.language)}/>

          {room.githubRepo && (
            <Link
              className="flex items-center gap-2 text-center text-sm"
              href={room.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github /> Github Repo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
