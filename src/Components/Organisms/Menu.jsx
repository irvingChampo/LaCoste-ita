import { useNavigate } from 'react-router-dom';
import Button from '../Atoms/Button';
import Button2 from '../Atoms/Button2';
import Card from "../Molecules/Card";
import CardVenta from '../Molecules/CardVentas';
import Header from "../Molecules/Header";
import './Menu.css';
import { useEffect, useState } from 'react';
import app_setting from '../../app.settings';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function Menu() {
    const navigate = useNavigate();
    const [productos, setproductos] = useState([{ product: [] }])
    const [comanda, setComanda] = useState({});
    const [total, setTotal] = useState(0)

    const handleClick = () => {
        navigate('./Agregar'); // Cambia '/nueva-vista' por la ruta de la vista a la que quieres navegar
    };
    const handleClick2 = () => {
        navigate('./Historial'); // Cambia '/nueva-vista' por la ruta de la vista a la que quieres navegar
    };

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        axios.get(app_setting.back_uri + "/product", config).then((res) => {
            if (!res.data.status) {
                return toast.error(res.data.message)
            }
            setproductos(res.data.data)
        }).catch((e) => {
            console.error(e)
            return toast.error("Ha ocurrido un error durante la petición.")
        })

    }, [])

    function renderList() {
        if (!Object.keys(comanda).length) {
            return <p>No hay productos aún.</p>
        }

        return Object.keys(comanda).map((itemName, index) => {
            const item = comanda[itemName];
            return (
                <CardVenta
                    key={index}
                    numeroProducto={index + 1}
                    cantidad={item.amount}
                    precio={item.price}
                    nombreProducto={item.name}
                    onDelete={() => {
                        setComanda(prevComanda => {
                            const newComanda = { ...prevComanda };
                            delete newComanda[item.name];
                            return newComanda;
                        });
                    }}
                    sharedTotal={setTotal}
                    sharedComanda={setComanda}
                />
            );
        });
    }

    function send_comanda() {
        const body = []
        for (let i = 0; i < Object.keys(comanda).length; i++) {
            body.push({
                id: comanda[Object.keys(comanda)[i]].id,
                amount: comanda[Object.keys(comanda)[i]].amount,
            })
        }
        if (body.length === 0) {
            return toast.warn("No hay productos en la comanda actual.")
        }

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        axios.post(app_setting.back_uri + "/history", body, config).then((res) => {
            if (!res.data.status) {
                return toast.error(res.data.message)
            }
            setComanda({})
            setTotal(0)
            return toast.success(res.data.message)
        }).catch((e) => {
            console.error(e)
            return toast.error("Ha ocurrido un error durante la petición.")
        })
    }

    return (
        <section>
            <ToastContainer />
            <Header />
            <div className="divPrincipal">
                <div className="listaVenta">
                    <h2>Lista de ventas</h2>
                    <div className="Listado">
                        {
                            renderList()
                        }
                    </div>
                    <div className="realizarVenta">
                        <p>Total:</p><p>${total}</p>
                        <Button text="Agregar" onClick={send_comanda} />
                    </div>
                </div>
                <div className="menuDigital">
                    <div className="headerMenu">
                        <p>Productos</p>
                        <Button2 text2="Agregar" onClick2={handleClick} />
                        <Button2 text2="Historial" onClick2={handleClick2} />

                    </div>
                    <div className="bodyMenu">
                        <div className="Comidas" style={{ overflow: 'auto', maxHeight: '80vh' }}>
                            <h2>Comidas</h2>
                            {
                                !productos.product ? <p>Sin productos.</p> : productos.product.map((item) => {
                                    if (item.type == 'food') {
                                        return <Card
                                            key={item.id}
                                            id={item.id}
                                            image={app_setting.back_uri + "/" + item.img}
                                            name={item.name}
                                            price={"$" + item.price}
                                            onButtonClick={() => {
                                                setComanda(prevComanda => {
                                                    const newComanda = { ...prevComanda };
                                                    newComanda[item.name] = {
                                                        id: item.id,
                                                        name: item.name,
                                                        price: item.price,
                                                        amount: 0
                                                    };
                                                    return newComanda;
                                                });
                                            }}
                                        />
                                    }
                                })
                            }

                        </div>

                        <div className="Bebidas" style={{ overflow: 'auto', maxHeight: '80vh' }}>
                            <h2>Bebidas</h2>
                            {
                                !productos.product ? <p>Sin productos.</p> : productos.product.map((item) => {
                                    if (item.type == 'drink') {
                                        return <Card
                                            key={item.id}
                                            id={item.id}
                                            image={app_setting.back_uri + "/" + item.img}
                                            name={item.name}
                                            price={"$" + item.price}
                                            onButtonClick={() => {
                                                setComanda(prevComanda => {
                                                    const newComanda = { ...prevComanda };
                                                    newComanda[item.name] = {
                                                        id: item.id,
                                                        name: item.name,
                                                        price: item.price,
                                                        amount: 0
                                                    };
                                                    return newComanda;
                                                });
                                            }}
                                        />
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Menu;