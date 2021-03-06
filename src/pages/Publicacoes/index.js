import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import LoadingCat from '../../components/LoadingCat';
import { convertDate } from '../../functions';
import { base_url } from '../../api';

import './styles.css';

export default function Publicacoes({ pageRef=0 }){
    const [page, setPage] = useState(pageRef);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [tags, setTags] = useState([]);

    const nextPage = () => {
        if(page < totalPages){
            setPage(page + 1);
        }
    }

    const prevPage = () => {
        if(page > 0){
            setPage(page - 1);
        }
    }

    const specificPage = () => {
        if(page === 0){
            setPage(2);
        } else {
            setPage(page - 2);
        }
    }

    function loadTotalPages( deleted=false ) {
        axios.get(`${base_url}/countposts/`)
            .then((response) => response.data)
            .then((data) => {
                if(deleted && data > 0 && data % 5 === 0){
                    setPage(page - 1);
                    setTotalPages(totalPages - 1);
                } else{
                    setTotalPages(Math.ceil(data / 5));
                }
            })
            .catch((error) => console.error(error));
    }

    function deletePost(post_id){
        if(window.confirm("Tem certeza?")){
            axios.delete(`${base_url}/posts/${post_id}?page=${page}`)
                .then((response) => response.data)
                .then((data) => setPosts(data))
                .then(() => loadTotalPages(true))
                .catch((error) => console.error(error));
        }
    }

    const loadPosts = async () => {
        setLoading(true);
        await axios.get(`${base_url}/posts?page=${page}`)
            .then((response) => response.data)
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => console.error(error));
        setLoading(false);
    }

    useEffect(() => {
        loadPosts();
        loadTotalPages();
    }, [page])

    return (
        <div className="container-publications">
            <div className="header-publications"><Header backoffice={true} atual={2} /></div>
            <div className="content-publications">
                <div className="backoffice-publications">
                    <h2>BACKOFFICE</h2>
                    <h1>Todas as publicações</h1>
                    {loading ? (
                        <div className="list-publications-loading-cat"><LoadingCat /></div>
                    ) : (
                        <div className="container-table-publications">
                            <table className="all-publications">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Data</th>
                                        <th>Título</th>
                                        <th>Tags</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post) => 
                                        (
                                        <tr key={post.id}>
                                            <td>{post.id}</td>
                                            <td>{convertDate(post.created_at)}</td>
                                            <td><Link to={`/post/${post.id}`}>{post.name}</Link></td>
                                            <td>{post.tags}</td>
                                            <td><Link to={`/editar-publicacao/${post.id}`}>Editar</Link></td>
                                            <td><a onClick={() => deletePost(post.id)}>Excluir</a></td>
                                        </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="backoffice-footer-publications">
                        <div className="btn">
                            <Link to="criar-publicacao"><Button styles="1">NOVA PUBLICAÇÃO</Button></Link>
                        </div>
                        <div className="menu">
                            <Pagination actualPage={page+1} totalPages={totalPages} previous={() => prevPage()} next={() => nextPage()} specific={() => specificPage()} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-publications"><Footer /></div>
        </div>
    );
}