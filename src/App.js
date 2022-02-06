import React from 'react';
import Login from './Components/Login/Login';
import { useStateValue } from './Components/ContextApi/StateProvider'
import {BrowserRouter as BR,Routes,Route} from 'react-router-dom'
import Chat from './Components/Chat/Chat';
import Sidebar from './Components/Sidebar/Sidebar';
import './App.css'

const App = () => {
    const [{user}] = useStateValue();
    return (
        <div className='app'>
            {!user ?
                <Login /> : 
                <div className='app__body'>
                    <BR>
                        <Sidebar/>
                        <Routes>
                            <Route path="/" element={<Chat/>} />
                            <Route path="/rooms/:roomId" element={<Chat/>} />
                        </Routes>
                    </BR>
                </div>
            }
        </div>
    )
};

export default App;
