import { SnackbarProvider } from 'notistack';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Agregar from '../Components/Organisms/Agregar';
import Historial from '../Components/Organisms/Historial';
import Login from '../Components/Organisms/Login';
import Menu from '../Components/Organisms/Menu';
import Modificar from '../Components/Organisms/Modificar';

function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu/agregar" element={<Agregar />} />
                    <Route path="/menu/modificar/:id" element={<Modificar />} />
                    <Route path="/menu/historial" element={<Historial />} />
                </Routes>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
