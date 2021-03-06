import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import Input from '../../components/Input';

import './styles.css';
import logo_petgato from '../../assets/images/gatinho_petgato.svg';
import { base_url } from '../../api';

export default function Cadastro(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    let history = useHistory();

    function changeName(name) {
        setName(name);
    }

    function changeEmail(email) {
        setEmail(email);
    }

    function changePassword(password) {
        setPassword(password);
    }

    function changePasswordConfirmation(passwordConfirmation) {
        setPasswordConfirmation(passwordConfirmation);
    }

    const cadastrar = async () => {
        
        if(name.length === 0){
            alert('O campo "Nome" não pode ficar vazio!');
            return;
        }

        if(email.length === 0){
            alert('O campo "Email" não pode ficar vazio!');
            return;
        }

        if(password.length === 0){
            alert('O campo "Senha" não pode ficar vazio!');
            return;
        }

        if(passwordConfirmation.length === 0){
            alert('O campo "Confirme sua senha" não pode ficar vazio!');
            return;
        }

        if(password !== passwordConfirmation){
            alert('As duas senhas não coincidem!');
            return;
        }

        axios.post(`${base_url}/users/`, {
                name: name,
                password: password,
                password_confirmation: passwordConfirmation,
                email: email
            })
            .then(response => {
                alert('Cadastro feito com sucesso! Por favor, entre na sua conta.');
                history.push("/login");
            })
            .catch(error => history.push("/erro"));
    }

    return (
        <div className="container-cadastro">
            <div className="container-img"></div>
            <div className="content-cadastro">

                <Link to="/"><img className="logo-petgato" src={logo_petgato} alt="Logo Petgatô" /></Link>
                <div className="container-input">
                    <Input name="Nome" handleValue={changeName} />
                    <Input name="Email" handleValue={changeEmail} />
                    <Input name="Senha" password={true} handleValue={changePassword} />
                    <Input name="Confirme sua senha" password={true} handleValue={changePasswordConfirmation} />
                </div>

                <Button onClick={() => cadastrar()} styles="3">CADASTRAR</Button>

                <p>Já possui conta? <Link to="/login">Faça login</Link></p>
            </div>
        </div>
    );
}
