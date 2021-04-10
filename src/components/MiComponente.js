import React, { Component } from 'react';

class MiComponente extends Component {


    render() {
        let receta = {
            nombre: 'Pizza 4 quesos',
            ingredientes: ['Queso', 'Tomate', 'Mozarella'],
            Precio: 400

        };

        return (
            <div className="mi-componente">
                <h1>{'Receta :' + receta.nombre}</h1>
                <h2>{'Precio :' + receta.Precio}</h2>
                {this.props.saludo &&
                    <React.Fragment>
                        <h1>USANDO UNA PROP :</h1>
                        <h2>{this.props.saludo}</h2>
                    </React.Fragment>

                }

                <ol>

                <hr/>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        );
    }
}
export default MiComponente;