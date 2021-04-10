import React, { Component } from 'react';
import Slider from './Slider';
import Articles from './Articles';
import Sidebar from './Sidebar';

class Search extends Component {
  

    render() {
      var searched=this.props.match.params.search;

        return (
            <div id="blog">
                <Slider
                    title={'Busqueda :'+searched}
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* LISTADO DE ARTICULOS DEL API*/}
                        <Articles 
                        search={searched}/>
                    </div>

                    <Sidebar
                        blog="true"
                    />
                </div>

            </div>

        );
    }

}
export default Search;