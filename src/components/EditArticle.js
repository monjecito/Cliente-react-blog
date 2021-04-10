import React, { Component, createRef } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Global from '../Global';
import Sidebar from './Sidebar';
import ImageDefault from '../assets/images/default-placeholder.png';
import SimpleReactValidator from 'simple-react-validator';
import * as swal from 'sweetalert';

//1. Recoger el id del articulo a editar desde la URL.
//2. Crear metodo para sacar ese objeto del Backend
//3. Rellenar el formulario con esos datos
//4. Actualizar el objeto con la petición al Backend


class editArticle extends Component {
    url = Global.url;
    articleId = null;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'El campo es requerido',

            }
        });

    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,

                    });
                }
            });
    }
    changeState = () => {

        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image:this.state.article.image
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle = (e) => {
        e.preventDefault();

        //Rellenar state con Formulario
        this.changeState();
        if (this.validator.allValid()) {


            //PETICION POR POST PARA GUARDAR ARTICULO
            axios.put(this.url + 'article/'+this.articleId,this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });


                        swal({
                            title: "Good job!",
                            text: "Articulo creado",
                            icon: "success",
                        });

                        //Subir el archivo
                        if (this.state.selectedFile !== null) {

                            //ID del articulo guardado
                            var articleId = this.state.article._id;
                            //Crear form data
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            //Peticion AJAX
                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });


                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }

                    } else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                });

        } else {

            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();

        }
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]

        });
        console.log(this.state);
    }

    render() {
        console.log(this.state.article);

        if (this.state.status === 'success') {
            return (
                <Redirect to="/blog" />
            )
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Articulo</h1>


                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>

                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}

                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState}></textarea>

                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                
                                <input type="file" name="file0" onChange={this.fileChange} />
                                <div className="image-wrap">
                                    {article.image !== null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb" />

                                    ) : (
                                            <img src={ImageDefault} alt={article.title} className="thumb" />
                                        )
                                    }
                                </div>
                            </div>

                            <div className="clearfix"></div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                    {!this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>
                    }

                </section>
                <Sidebar />
            </div>
        );
    }

}
export default editArticle;