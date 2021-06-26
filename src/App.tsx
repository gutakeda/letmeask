
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { AdminRoom } from './pages/AdminRoom'
import { RoomList } from './pages/RoomList'
import { NavigationBar } from './components/NavigationBar'

import { AuthContextProvider } from './contexts/AuthContext'
import { NavContextProvider } from './contexts/NavContext'

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider >
        <NavContextProvider>
          <NavigationBar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" exact component={Room} />
            <Route path="/admin/rooms/:id" exact component={AdminRoom} />
            <Route path="/list" component={RoomList} />
          </Switch>
        </NavContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
