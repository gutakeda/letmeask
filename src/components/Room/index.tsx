import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';

type RoomProps = {
    id: string,
    authorId?: string,
    authorName?: string,
    avatar: string,
    title: string,
    children?: ReactNode;
}

export function Room({
    authorName = '',
    avatar = '',
    title,
    children
}: RoomProps) {
    return (
        <div
            className={cx(
                'room',
            )}
        >
            <div className="room-info">
                <h3>{title}</h3>
            </div>

            <footer>
                <div className="user-info">
                    <img src={avatar} alt={authorName} />
                    <span>{authorName}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}