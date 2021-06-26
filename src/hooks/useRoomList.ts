import { useEffect, useState } from 'react';
import { database } from "../services/firebase"
import { useAuth } from './useAuth';

type RoomType = {
    id: string,
    authorId: string,
    authorName: string,
    avatar: string,
    title: string,
}

type FireBaseRooms = Record<string, {
    authorId: string,
    authorName: string,
    avatar: string,
    title: string,
}>

export function useRoomList() {
    const { user } = useAuth();
    const [rooms, setRooms] = useState<RoomType[]>([]);

    useEffect(() => {
        let roomRef = database.ref('rooms');
        roomRef.on('value', room => {
            const databaseRoom: FireBaseRooms = room.val();
            if (databaseRoom) {
                const parsedRooms = Object.entries(databaseRoom).map(([key, value]) => {
                    return {
                        id: key,
                        authorId: value.authorId,
                        authorName: value.authorName,
                        avatar: value.avatar,
                        title: value.title,
                    }
                })
                setRooms(parsedRooms);
            }
        })

        return () => {
            roomRef.off('value');
        }
    }, [user?.id])
    return { rooms }
}