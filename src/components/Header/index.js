import './styles.css';
import logo from '../../assets/catlogo.jpg';

function Header() {
    return (
        <header className="header">
            <div className='header-content'>
                <a className="header-logo" href='/'>
                    <img className="header-logo-img" src={logo} alt='cat' />
                </a>
            </div>
        </header>
    )
}

export default Header;