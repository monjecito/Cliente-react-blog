import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/es';
import axios from 'axios';
import Global from '../Global';
import ImageDefault from '../assets/images/default-placeholder.png';

class Articles extends Component {

    url = Global.url;

    state = {
        articles: {},
        status: null
    };

    componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;
        if (home === 'true') {
            this.getLastArticles();
        } else if (search && search !== null && search !== undefined) {
            this.getArticlesBySearch(search);

        } else {
            this.getArticles();
        }

    }
    getArticles = () => {
        axios.get(this.url + "articles")
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });

            });
    }
    getArticlesBySearch = (searched) => {
        axios.get(this.url + "search/" + searched)
            .then(res => {


                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });



            })
            .catch(err => {
                this.setState({
                    articles: [],
                    status: 'success'
                });
            });
    }

    getLastArticles = () => {
        axios.get(this.url + "articles/last")
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });

            });
    }
   

    render() {
        if (this.state.articles.length >= 1) {


            var listArticles = this.state.articles.map((article,i) => {
                return (
                    <article className="article-item" id="article-template" key={i}>
                        <div className="image-wrap">
                            {article.image !== null ? (
                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />

                            ) : (
                                    <img src={ImageDefault} alt={article.title} />
                                )
                            }

                        </div>

                        <h1 className="subheader">{article.title}</h1>
                        <span className="date">
                            <Moment fromNow>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id}>Leer m??s</Link>

                        <div className="clearfix"></div>
                    </article>
                )
            });
            return (
                <div id="articles">
                    {listArticles}
                </div>
            );

        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">No se encuentran art??culos</h2>
                    <p>Todavia no hay contenido en este sitio</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>
            );
        }

    }

}
export default Articles;