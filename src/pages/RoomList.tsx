import { useHistory } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Room } from '../components/Room'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useRoomList } from '../hooks/useRoomList'
import { database } from '../services/firebase'
import '../styles/room.scss'


export function RoomList() {
    const history = useHistory();
    const { rooms } = useRoomList();

    async function handleJoinRoom(roomCode: string) {
        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exist.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);

    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                </div>
            </header>

            <main className="content">
                <div className="question-list">
                    {rooms && rooms.map(room => {
                        return (
                            <Room
                                key={room.id}
                                id={room.id}
                                authorName={room.authorName}
                                avatar={room.avatar}
                                title={room.title}

                            >
                                <RoomCode code={room.id} minimal />
                                <Button onClick={() => handleJoinRoom(room.id)}>Entrar na sala</Button>
                            </Room>
                        )
                    })}
                </div>
            </main>
        </div >
    )
}