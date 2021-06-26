import { useParams } from 'react-router'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import { Question } from '../components/Question'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import { useHistory } from 'react-router-dom'

import '../styles/room.scss'
import { FormEvent, Fragment, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();

    const roomId = params.id;

    const { title, questions } = useRoom(roomId);
    const [current, setCurrent] = useState<number>();
    const [newQuestionAnswer, setNewQuestionAnswer] = useState('');

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })
        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string, index: number) {
        if (current !== index) {
            setCurrent(index);
        }
        else setCurrent(-1)
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
    }

    async function handleAnswerQuestion(questionId: string, event: FormEvent) {
        event.preventDefault();

        if (newQuestionAnswer.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in');
        }

        const answer = {
            content: newQuestionAnswer,
            author: {
                name: user.name,
                avatar: user.avatar
            },
        }

        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            answer: answer
        });

        setNewQuestionAnswer('');

        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        });
        setCurrent(-1)
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions && questions.map((question, index) => {
                        return (
                            <Fragment key={question.id} >
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                    isAnswered={question.isAnswered}
                                    isHighlighted={question.isHighlighted}
                                >
                                    {!question.isAnswered && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleCheckQuestionAsAnswered(question.id, index)}
                                            >
                                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleHighlightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Dar destaque à pergunta" />
                                            </button>
                                        </>)}
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImg} alt="Remover pergunta" />
                                    </button>
                                </Question>
                                <form onSubmit={(evt) => handleAnswerQuestion(question.id, evt)} hidden={current !== index}>
                                    <textarea
                                        placeholder="Resposta"
                                        onChange={event => setNewQuestionAnswer(event.target.value)}
                                        value={newQuestionAnswer}
                                    />
                                    <div className="form-footer">
                                        <Button type="submit" disabled={!user}>Responder pergunta</Button>
                                    </div>
                                </form>
                            </Fragment>
                        )
                    })}</div>
            </main>
        </div>
    )
}