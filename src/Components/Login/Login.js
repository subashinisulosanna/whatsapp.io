import React from 'react';
import { Button } from '@mui/material'
import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import '../Login/Login.css'
import {useStateValue} from '../ContextApi/StateProvider'
import { actionTypes } from '../ContextApi/reducer';

const Login = () => {
    const [state,dispatch] = useStateValue();
console.log(state)
    const signIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user:result.user,
            })
            
            console.log(result)
        }).catch((err) => {
            alert(err)
        })
    }
    return (
        <div className='login'>
            <div className='login__container'> 
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png'
                    alt='whatsapp-logo'
                />
                <div className='login__text'>
                    <h1>Sign in to whatsapp</h1>
                </div>
                <Button onClick={signIn}>Sign in with google</Button>
            </div>
        </div>
  )
};

export default Login;
