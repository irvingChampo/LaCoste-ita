import { useNavigate, useParams } from 'react-router-dom';
import Delete from '../../assets/Img/Eliminar-producto.png';
import Modificar from '../../assets/Img/Modificar.png';
import Button from '../Atoms/Button';
import ButtonImage from '../Atoms/ButtonImage';
import './Card.css';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import app_setting from '../../app.settings';


// eslint-disable-next-line react/prop-types
const Card = ({ image, name, price, onButtonClick, id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('./modificar/' + id); // Cambia '/nueva-vista' por la ruta de la vista a la que quieres navegar
    };
    const handleClick2 = () => {
        enqueueSnackbar("¿Deseas eliminar este producto?", {
            variant: "warning",
            action: (key) => (
                <>
                    <button
                        className="buttonAlert"
                        onClick={() => {

                            const config = {
                                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                            };

                            axios.delete(app_setting.back_uri + "/product/" + id, config).then((res) => {

                                if (!res.data.status) {
                                    setTimeout(() => {
                                        window.location.reload()
                                    }, 600)
                                    return enqueueSnackbar(res.data.message, { variant: "error" })
                                }

                                setTimeout(() => {
                                    window.location.reload()
                                }, 600)

                                return enqueueSnackbar(res.data.message, { variant: "success" })
                            }).catch((e) => {
                                console.error(e)
                                enqueueSnackbar("Ha ocurrido un error con tu petición.", { variant: "error" })
                            })
                        }}
                    >
                        Sí
                    </button>

                    <button
                        className="buttonAlert2"
                        onClick={() => {
                            enqueueSnackbar("Acción cancelada.", { variant: "default" });
                        }}
                    >
                        No
                    </button>
                </>
            ),
        });
    };
    return (
        <div className='Card'>
            <img src={image} alt={name} className='CardImage' />
            <h3 className='CardName'>{name}</h3>
            <p className='CardPrice'>{price}</p>
            <Button text='vender' onClick={onButtonClick} />
            <div className='headerCard'>
                <ButtonImage className='ButtonFooter' image={Modificar} onClick={handleClick}></ButtonImage>
                <ButtonImage className='ButtonFooter' image={Delete} onClick={handleClick2}></ButtonImage>
            </div>
        </div>
    );
};

export default Card;
