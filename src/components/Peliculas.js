import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';
class Peliculas extends Component {

    state = {

    };

    favorita = (pelicula, indice) => {
        this.setState({
            favorita: pelicula,
            indice: indice
        });
    }
    cambiarTitulo = () => {
        var { peliculas } = this.state;
        // var random=Math.floor(Math.random()*3);
        peliculas[0].titulo = "DARK";

        this.setState({
            peliculas: peliculas
        });
    }

    componentWillMount() {
        alert('SE VA A MONTAR EL COMPONENTE DE PELICULAS');
        this.setState({
            peliculas: [
                { titulo: 'Breaking Bad', image: 'https://static1.abc.es/media/play/2019/06/04/breaking-bad-k3RE--620x349@abc.jpg' },
                { titulo: 'Bojack Horseman', image: 'https://cnet1.cbsistatic.com/img/Fo3dgW6jLoN1UvGepAKgfGQNC14=/1200x675/2017/03/24/229875ea-042d-40b5-a1f6-3881e808a179/bojackhorseman2.jpg' },
                { titulo: 'Prison Break', image: 'https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2015/08/06/135062.jpg' }
            ],
            nombre: 'Diego Monje',
            favorita: {}
        });
    }
    componentDidMount() {
        //    alert('COMPONENTE MONTADO CORRECTAMENTE');
    }

    componentWillUnmount() {
        //   alert('Componente desmontado');

    }

    render() {
        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };

        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>
                        La serie favorita es :
                </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            );
        } else {
            favorita = (

                <p>NO HAY SERIE FAVORITA</p>

            );
        }
        return (
            <React.Fragment>
                <Slider
                    title="TOP SERIES"
                    size="slider-small"
                />


                <div className="center">
                    <div id="content" className="peliculas">

                        <h2 className="subheader">LAS MEJORES SERIES DE LA HISTORIA</h2>
                        <p>Selección de las mejores series según {this.state.nombre}</p>
                        <p>
                            <button onClick={this.cambiarTitulo}>
                                Cambiar titulo
                        </button>
                        </p>
                        {
                            favorita
                        }

                        {/* CREAR COMPONENTE PELICULA*/}

                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, index) => {
                                    return (
                                        <Pelicula key={index}
                                            pelicula={pelicula}
                                            indice={index}
                                            marcarFavorita={this.favorita}

                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </React.Fragment>
        );
    }


}
export default Peliculas;