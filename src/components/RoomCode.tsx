import copyImg from '../assets/images/copy.svg';
import cx from 'classnames';

import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
    minimal?: boolean
}

export function RoomCode({ minimal = false, ...props }: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className={cx(
            'room-code',
            { minimal: minimal },
        )} onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span> {minimal ? 'Copy code ' : `Sala #${props.code}`}</span>

        </button>
    )
}