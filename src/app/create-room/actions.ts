'use server'

import { db } from "@/db";
import { room, Room } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getServerSession(authConfig);

    if (!session) {
        throw new Error("You must be logged in to create this room");
    }

    await db.insert(room).values({ ...roomData, userId: session.user.id });
}