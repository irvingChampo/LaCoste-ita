import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import Header from "../Molecules/Header";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import app_setting from '../../app.settings';

function Agregar() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [gain, setGain] = useState('')
    const [type, setType] = useState('food')
    const [img, setImg] = useState(null)

    const submitProduct = (e) => {
        e.target.disabled = true
        if (!name ||
            !price ||
            !gain ||
            !img) {
            e.target.disabled = false
            return toast.error("Complete todos los campos por favor.")
        }

        if (
            price < 1 ||
            gain < 1) {
            e.target.disabled = false
            return toast.error("Ingrese valores válidos.")
        }

        const body = new FormData()

        body.append("name", name)
        body.append("price", price)
        body.append("gain", gain)
        body.append("type", type)
        body.append("image", img)

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        axios.post(app_setting.back_uri + "/product/add", body, config).then((res) => {
            if (!res.data.status) {
                return toast.error(res.data.message)
            }
            setTimeout(() => {
                navigate('/menu')
            }, 500)
            return toast.success(res.data.message)
        }).catch((e) => {
            console.error(e)
            return toast.error("Ha ocurrido un error durante la petición.")
        })

    };

    const handleCancelClick = () => {
        enqueueSnackbar('¿Estás seguro de esta acción?', {
            variant: 'warning',
            action: key => (
                <>
                    <button className='buttonAlert' onClick={() => { enqueueSnackbar('Acción cancelada', { variant: 'info' }); navigate('/Menu'); }}>Sí</button>
                    <button className='buttonAlert2' onClick={() => { enqueueSnackbar('Acción no realizada', { variant: 'success' }); }}>No</button>
                </>
            ),
        });
    };

    return (
        <section className="SeccionLogin">
            <Header />
            <div className="DivLogin">
                <Input type="file" placeholder="Imagen" onChange={(e) => {
                    setImg(e.target.files[0])
                }} />
                <Input placeholder="Nombre" onInput={(e) => {
                    setName(e.target.value)
                }
                } />
                <Input placeholder="Precio"
                    type="number"
                    onInput={(e) => {
                        setPrice(e.target.value)
                    }
                    } />
                <Input placeholder="Ganancia"
                    type="number"
                    onInput={(e) => {
                        setGain(e.target.value)
                    }
                    } />


                <label htmlFor="food">Comida</label>
                <input type="radio" onClick={(e) => {
                    console.log("A")
                    if (e.target.checked) {
                        setType(e.target.value)
                    }
                }} name="type" value="food" id='food' defaultChecked />


                <label htmlFor="drink">Bebida</label>

                <input type="radio" onClick={(e) => {
                    console.log("B")
                    if (e.target.checked) {
                        setType(e.target.value)
                    }
                }} name="type" value="drink" id='drink' />


                <div className='Botones'>
                    <Button text="Agregar" onClick={submitProduct} />
                    <Button text="Cancelar" onClick={() => {
                        enqueueSnackbar('¿Estás seguro de esta acción?', {
                            variant: 'warning',
                            action: key => (
                                <>
                                    <button className='buttonAlert' onClick={() => { enqueueSnackbar('Acción cancelada', { variant: 'info' }); navigate('/Menu'); }}>Sí</button>
                                    <button className='buttonAlert2' onClick={() => { enqueueSnackbar('Acción no realizada', { variant: 'success' }); }}>No</button>
                                </>
                            ),
                        });
                    }} />
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default Agregar;
