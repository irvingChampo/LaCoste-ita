import Logo from '../../assets/Img/Logo.jpg';
import './Header.css';

function Header() {
    return ( 
        <section className="Header">
        <div className='divImg'>
        <img className='Logo' src={Logo}></img>
        </div>
        <div className='divTitle'>
        <h1>La Costeñita</h1>
        </div>
        </section>
     );
}

export default Header;