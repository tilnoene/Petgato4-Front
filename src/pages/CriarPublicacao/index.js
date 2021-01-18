import { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';

import './styles.css';

export default function CriarPublicacao(){
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [tags, setTags] = useState([]);
    let history = useHistory();

    function changeTitle(title) {
        setTitle(title);
    }

    function createPost() {
        axios.post(`http://localhost:3000/posts/`, {
            "name": title,
            "content": value
            })
            .catch((error) => console.error(error)); // colocar um erro de pop up
    }

    const loadTags = async () => {
        axios.get(`http://localhost:3000/alltags/`)
            .then((response) => response.data)
            .then((data) => setTags(data))
            .catch((error) => (
                <Redirect to={{ pathname: '/erro', state: { from: error.location } }} />
            ));
    }

    useEffect(() => {
        loadTags();
    }, []);

    let modules = {
        toolbar: {
          container: [
            [{ 'font': [] }, { size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" }
            ],
            [{ 'direction': 'rtl' }, { align: [] }],
            ["link", "image", "video", "formula"],
            ["clean"]
          ],
        },
        clipboard: { matchVisual: false }
    };

    return (
        <div className="container-criar-publicacao">
            <div className="header-criar-publicacao"><Header backoffice={true} atual={2} /></div>
            <div className="content-criar-publicacao">
                <div className="backoffice-criar-publicacao">
                    <h2>BACKOFFICE</h2>
                    <h1>Criar Publicação</h1>

                    <div className="container-title">
                        <Input name="Título da Publicação" styles={1} handleValue={changeTitle} />
                    </div>

                    <div className="container-react-quill">
                        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} placeholder={"Escreva a publicação aqui..."}/>
                    </div>

                    <h3>Escolha uma imagem de capa:</h3>
                    <div className="upload-content">
                        <Button onClick={() => alert('UPLOAD')} styles="1">Escolher Arquivo</Button>
                        <p>Nenhum arquivo escolhido</p>
                    </div>
                    <h3>Escolha pelo menos uma tag:</h3>
                    <div className="container-select-tags">
                    {tags.map((tag) => 
                    (   
                        <div className="tag-content" key={tag.id}>
                            <input type="checkbox" name={tag.name} />
                            <span>{tag.name}</span>
                        </div>
                    )
                    )}
                    </div>
                    
                    <Link to="/tags"><Button styles="1">GERENCIAR TAGS</Button></Link>
                    
                    <div className="container-buttons">
                        <Button onClick={() => createPost()} styles="3">PUBLICAR</Button>
                        <Button styles="1" onClick={() => history.goBack()}>VOLTAR</Button>
                    </div>
                </div>
            </div>
            <div className="footer-criar-publicacao"><Footer /></div>
        </div>
    );
}