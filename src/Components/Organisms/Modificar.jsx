import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import Header from "../Molecules/Header";
import { useEffect, useState } from "react";
import app_setting from "../../app.settings";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Modificar() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const handleAddClick = () => {
        const body = new FormData()

        body.append("name", data.name)
        body.append("price", data.price)
        body.append("gain", data.gain)
        body.append("image", data.img)

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        axios.put(app_setting.back_uri + "/product/" + params.id, body, config).then((res) => {
            if (!res.data.status) {
                return enqueueSnackbar(res.data.message, { variant: "error" })
            }
            setTimeout(() => {
                navigate('/menu')
            }, 500)
            return enqueueSnackbar(res.data.message, { variant: "success" })
        }).catch((e) => {
            console.error(e)
            enqueueSnackbar("Ha ocurrido un error con tu petición.", { variant: "error" })
        })
    };

    const [data, setData] = useState({
        id: 0,
        name: "",
        price: 0,
        gain: 0,
        img: null
    });

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };

        axios
            .get(app_setting.back_uri + "/product/" + params.id, config)
            .then((res) => {
                if (!res.data.status) {
                    return toast.error(res.data.message);
                }
                setData((prev) => {
                    let newDat = res.data.data.attributes;
                    newDat.gain = parseFloat(res.data.data.attributes.gain);
                    newDat.price = parseFloat(res.data.data.attributes.price);
                    newDat.img = null
                    return newDat;
                });
            })
            .catch((e) => {
                console.error(e);
                return toast.error("Ha ocurrido un error durante la petición.");
            });
    }, []);

    const handleCancelClick = () => {
        enqueueSnackbar("¿Estás seguro de esta acción?", {
            variant: "warning",
            action: (key) => (
                <>
                    <button
                        className="buttonAlert"
                        onClick={() => {
                            enqueueSnackbar("Acción cancelada", { variant: "info" });
                            navigate("/Menu");
                        }}
                    >
                        Sí
                    </button>

                    <button
                        className="buttonAlert2"
                        onClick={() => {
                            enqueueSnackbar("Acción no realizada", { variant: "success" });
                        }}
                    >
                        No
                    </button>
                </>
            ),
        });
    };

    return (
        <section className="SeccionLogin">
            <ToastContainer />
            <Header />
            <div className="DivLogin">
                <Input type="file" placeholder="Imagen"
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            img: e.target.files[0],
                        }));
                    }} />
                <Input
                    placeholder="Nombre"
                    value={data.name}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }));
                    }}
                />

                <Input
                    placeholder="Precio"
                    value={data.price}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            price: e.target.value,
                        }));
                    }}
                />
                <Input
                    placeholder="Ganancia"
                    value={data.gain}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            gain: e.target.value,
                        }));
                    }}
                />
                <div className="Botones">
                    <Button text="Modificar" onClick={handleAddClick} />
                    <Button text="Cancelar" onClick={handleCancelClick} />
                </div>
            </div>
        </section>
    );
}

export default Modificar;