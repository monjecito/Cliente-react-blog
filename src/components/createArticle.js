import React, { Component, createRef } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import * as swal from 'sweetalert';

//Validacion formularios y alertas

class createArticle extends Component {
    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'El campo es requerido',

            }
        });

    }
    changeState = () => {

        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
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
            axios.post(this.url + 'save', this.state.article)
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
        if (this.state.status === 'success') {
            return (
                <Redirect to="/blog" />
            )
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear Articulo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>

                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}

                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>

                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar />
            </div>
        );
    }

}
export default createArticle;