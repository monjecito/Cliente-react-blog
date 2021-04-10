import React, { Component } from 'react';
import Slider from './Slider';
import Articles from './Articles';
import Sidebar from './Sidebar';

class Home extends Component {
    render() {
        var buttonString = "Ir al blog";
        return (
            <div id="home">
                <Slider
                    title="CACAHUETE"
                    btn={buttonString}
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Ultimos articulos</h1>
                        <Articles 
                        home="true"
                        
                        />
                    </div>
                    <Sidebar />
                </div>

            </div>

        )
    }
}
export default Home;