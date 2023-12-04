import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/Img/Logo.jpg';
import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import Header from "../Molecules/Header";
import './Login.css';

import app_setting from '../../app.settings';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {

        if (!username.trim() || password.trim().length < 4) {
            return toast.error('Proporcione nombre de usuarios y contraseña válidos.');
        }

        axios.post(`${app_setting.back_uri}/auth/login`, {
            username: username,
            password: password
        }).then((response) => {
            if (!response.data.status) {
                return toast.error(response.data.message)
            }
            localStorage.setItem('token', response.data.data.token)
            setTimeout(() => {
                navigate('/menu')
            }, 500)
            return toast.success(response.data.message)
        }).catch((e) => {
            console.error(e)
            return toast.error("Ha ocurrido un error durante la petición.")
        })
    };

    function register() {
        if (!username.trim() || password.trim().length < 4) {
            return toast.error('Proporcione nombre de usuarios y contraseña válidos.');
        }

        axios.post(`${app_setting.back_uri}/auth/signup`, {
            username: username,
            password: password
        }).then((response) => {
            if (!response.data.status) {
                return toast.error(response.data.message)
            }
            localStorage.setItem('token', response.data.data.token)
            return toast.success(response.data.message)
        }).catch((e) => {
            console.error(e)
            return toast.error("Ha ocurrido un error durante la petición.")
        })
    }

    return (
        <section className="flex flex-wrap justify-center items-center, SeccionLogin">
          <Header />
          <div className="w-1/2 h-3/4 bg-gray-800 shadow-2xl flex flex-col justify-center items-center m-5 rounded-lg, DivLogin">
            <img className="w-1/3 p-1 rounded-full, LogoLogin" src={Logo} alt="Logo" />
            <Input placeholder="Usuario" onChange={e => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password:" onChange={e => setPassword(e.target.value)} />
            <Button text="Ingresar" onClick={handleClick} />
            <Button text="Registrarse" onClick={register} />
          </div>
          <ToastContainer />
        </section>
      );
}

export default Login;