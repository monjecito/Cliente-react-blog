import React, { Component } from 'react';
import MiComponente from './MiComponente';
import Peliculas from './Peliculas';



class SeccionPruebas extends Component {

    contador = 0;
    /*
    constructor(props) {
        super(props);
                                //ESTADO
        this.state = {
            contador: 0
        };
    }
    */
    state={
        contador:0
    };

    sumar=(e)=>{    
        this.setState({
            contador: (this.state.contador+1)
        });
    }

    restar=(e)=>{
       
        this.setState({
            contador: (this.state.contador-1)
        });
    }

    render() {
        var nombre = 'Diego Monje';
        return (
            <section id="content">
                <h2 className="subheader">Últimos artículos</h2>
                <p>
                    HOLA BIENVENIDO A MI BLOG
                
                </p>

                <h2 className="Subheader">Componentes</h2>
                <section className="components">

                    <MiComponente />

                    <MiComponente />
                   

                </section>
                <h2 className="subheader">Estado</h2>
                <p>
                    Contador : {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar} />
                    <input type="button" value="Restar" onClick={this.restar} />
                </p>
            </section>
        );
    }
}

export default SeccionPruebas;