import { useEffect, useState } from "react";
import Button from "../Atoms/Button";
import CardHistorial from "../Molecules/CardHistorial";
import Header from "../Molecules/Header";
import './Historial.css';
import axios from "axios";
import app_setting from "../../app.settings";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Historial() {
    const [data, setData] = useState([])
    const [gain, setGain] = useState(0)
    const [price, setPrice] = useState(0)
    const navigate = useNavigate()

    function get_records(range) {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        axios.get(app_setting.back_uri + "/history/" + range, config).then((res) => {
            if (!res.data.status) {
                setData([]);
                setGain(0);
                setPrice(0);
                return toast.error(res.data.message);
            }

            const newData = res.data.data.content;

            const totalGain = newData.reduce((total, item) => total + item.gain, 0);
            const totalPrice = newData.reduce((total, item) => total + item.price, 0);

            setData(newData);
            setGain(parseFloat(totalGain).toFixed(2));
            setPrice(parseFloat(totalPrice).toFixed(2));
        }).catch((e) => {
            console.error(e);
            return toast.error("Ha ocurrido un error durante la petición.");
        });
    }

    useEffect(() => { get_records("today") }, [])

    return (
        <section>
            <ToastContainer limit={2} />
            <Header />
            <div className="divHistorial">
                <div className="totalVentas">
                    <h2>Total de ventas</h2>
                    <div className="divH3">
                        <h3>Total de ventas:</h3>
                        <h3>Dinero Obtenido:</h3>
                        <h3>Ganancia:</h3>
                    </div>
                    <div className="divH4">
                        <h4>#{data.length}</h4>
                        <h4>${price}</h4>
                        <h4>${gain}</h4>
                    </div>
                    <div className='Botones'>
                        <Button text="Volver" onClick={() => {
                            navigate('/menu')
                        }} />
                    </div>
                </div>
                <div className="HistorialVentas" style={{ overflow: 'auto', maxHeight: '70vh' }}>
                    <div className="Comandas">
                        <h2>Comandas</h2>
                        <h4>Filtrar por:</h4>
                        <Button text="Dia" onClick={() => { get_records('today') }} />
                        <Button text="Mes" onClick={() => { get_records('month') }} />
                        <Button text="Año" onClick={() => { get_records('year') }} />
                    </div>
                    {
                        data.length <= 0 ? <p>No hay datos que mostrar</p> : data.map((item, index) => {
                            return <CardHistorial
                                key={index}
                                producto={item.name}
                                neto={item.price}
                                ganancia={item.gain}
                            />
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Historial;