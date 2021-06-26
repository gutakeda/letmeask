import './styles.scss';
import { Link } from 'react-router-dom';
import { useActive } from '../../hooks/useActive';

type NavigationBarType = {
    isHome?: boolean
    currentActive?: string
}
export function NavigationBar({ isHome = false, ...props }: NavigationBarType) {
    const { currentActive } = useActive();
    return (
        <div id="navBar" className={`${(currentActive === "Home" || currentActive === "NewRoom") ? 'hidenavbar' : ''}`}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/rooms/new">Criar nova sala</Link></li>
                <li><Link className={`${currentActive === "RoomList" ? 'active' : ''}`} to="/list">Lista de salas</Link></li>
            </ul>
        </div>)
}