import React, { Component } from 'react';
import Slider from './Slider';
import Articles from './Articles';
import Sidebar from './Sidebar';
class Blog extends Component {
  

    render() {
      
        return (
            <div id="blog">
                <Slider
                    title="Este es el Blog"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* LISTADO DE ARTICULOS DEL API*/}
                        <Articles />
                    </div>

                    <Sidebar
                        blog="true"
                    />
                </div>

            </div>

        );
    }

}
export default Blog;