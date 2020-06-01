import React, { Component } from 'react'
import Home from './components/Home';
import { SVG,SVGRedGlass,SVGLogo } from './SVG/SVG';
import Button from './common/Button';
import { Background } from './common/Background';

export default class App extends Component {

    constructor(){
        super();
        this.state = {
            background:''
        }
        this.bck = this.bck.bind(this);        
    }
    bck(background){
        this.setState({background});
    }
    render() {
        const color = 'white';
        return (
            <>
             <Background color={this.state.background}>
                    <div className="container">                
                    <h1 className="text-center"><SVGLogo color={this.state.background} />Wine</h1>                  
                    <Home background={this.bck}/>
                    
                    </div>
            </Background>
            </>
        )
    }
}
