import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated, isAdmin, logout } from '../../auth';

import "./style.css";
import petgato_icon from '../../assets/gatinho_petgato_branco.svg';
import menu_icon from '../../assets/menu_icon.svg';
import exit_icon from '../../assets/exit_icon.svg';

const Header = ({ backoffice=false, atual=1 }) => {
    const [logged, setLogged] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [down, setDown] = useState(false);
    let history = useHistory();

    const changeMenu = () => {
        document.body.style.overflow = "visible";
        setDown(!down);
    }

    useEffect(() => {
        isAuthenticated().then(response => setLogged(response));
        isAdmin().then(response => setAdmin(response));
    }, [down, logged, admin])

    return (
        <div className={`header ${down && "on"}`}>
            <Link to="/"><img alt="PetGatô" src={petgato_icon}/></Link>
            {backoffice ? (
                <div className="links">
                    <Link to="/">Página Inicial</Link>
                    {atual === 2 ? (<Link to="/publicacoes" className="selected-header">Publicações</Link>) : (<Link to="/publicacoes">Publicações</Link>)}
                    {atual === 3 ? (<Link to="/tags" className="selected-header">Tags</Link>) : (<Link to="/tags">Tags</Link>)}
                    {atual === 4 ? (<Link to="/usuarios" className="selected-header">Usuários</Link>) : (<Link to="/usuarios">Usuários</Link>)}
                    {atual === 5 ? (<Link to="/denuncias" className="selected-header">Denúncias</Link>) : (<Link to="/denuncias">Denúncias</Link>)}
                    {atual === 6 ? (<Link to="/mensagens" className="selected-header">Mensagens</Link>) : (<Link to="/mensagens">Mensagens</Link>)}
                    {logged && (<a onClick={() => {
                        logout();
                        history.push("/");
                    }} >Sair</a>)}
                    <img onClick={() => changeMenu()} className="menu" src={menu_icon} alt="Menu" />
                    <img onClick={() => changeMenu()} className="exit" src={exit_icon} alt="Fechar" />
                </div>
            ) : (
                <div className="links">
                    {atual === 1 ? (<Link to="/" className="selected-header">Página Inicial</Link>) : (<Link to="/">Página Inicial</Link>)}
                    {atual === 2 ? (<Link to="/sobre" className="selected-header">Sobre Nós</Link>) : (<Link to="/sobre">Sobre Nós</Link>)}
                    {atual === 3 ? (<Link to="/contato" className="selected-header">Fale Conosco</Link>) : (<Link to="/contato">Fale Conosco</Link>)}
                    {admin && (<Link to="/publicacoes">Backoffice</Link>)}
                    {logged ? (
                        atual === 4 ? (<Link to="/editar-perfil" className="selected-header">Minha Conta</Link>) : (<Link to="/editar-perfil">Minha Conta</Link>)
                    ) : (<Link to="/login">Entrar</Link>)}
                    {logged && (<a onClick={() => {
                        logout();
                        history.push("/");
                    }} >Sair</a>)}
                    <img onClick={() => changeMenu()} className="menu" src={menu_icon} alt="Menu" />
                    <img onClick={() => changeMenu()} className="exit" src={exit_icon} alt="Fechar" />
                </div>
            )}
        </div>
    );
}

export default Header;