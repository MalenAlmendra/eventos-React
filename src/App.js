import React, {Component} from 'react';
import Header from './components/header'
import Formulario from './components/formulario'
import Eventos from './components/eventos'

class App extends Component{

  token='M5OWXDFN4E2JIVKJOOZO';
  ordenar='date'

  state={
    categorias:[],
    eventos:[]
  }
  componentDidMount(){
    this.obtenerCategorias();
  }

  obtenerCategorias=async()=>{
    let url=`https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`
    await fetch(url)
      .then(respuesta=>{
        return respuesta.json()
      })
      .then(categorias=>{
        this.setState({
          categorias:categorias.categories
        })
        
      })
  }
  obtenerEventos=async(busqueda)=>{
    let url=`https://www.eventbriteapi.com/v3/events/search/?q=${busqueda.nombre}&categories=${busqueda.categoria}&sort_by=${this.ordenar}&token=${this.token}&locale=es_ES`
    await fetch(url)
      .then(respuesta=>{
        return respuesta.json()
      })
      .then(eventos=>{
        this.setState({
          eventos:eventos.events
        })
      })
    
  }
  render(){
    return (
      <div className="App">
        <Header></Header>
        <div className="uk-container">
          <Formulario
            categorias={this.state.categorias}
            obtenerEventos={this.obtenerEventos}
          />
          <Eventos
            eventos={this.state.eventos}
          />
        </div>
      </div>
    );
  }
}


export default App;
