import { db } from "@/db";

export default async function Home() {
  
  const rooms = await db.query.room.findMany() 
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {
          rooms.map((room) => (
            <div key={room.id}>
              {room.name}
            </div>
          ))
        }
    </div>
  );
}
