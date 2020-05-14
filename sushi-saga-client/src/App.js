import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    eaten: [],
    money: 100,
    displayIndex: 0
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(res => {
      this.setState({
        sushis: res
      })
    })
  }

  eat = (sushi) => {
    const moneyAfter = this.state.money - sushi.price

    if(!this.state.eaten.includes(sushi) && moneyAfter >= 0) {
      this.setState({
        eaten: [...this.state.eaten, sushi],
        money: moneyAfter
      })
    }
  }

  displayFourSushis = () => {
    return this.state.sushis.slice(this.state.displayIndex, this.state.displayIndex+4)
  }

  more = (event) => {
    let newDisplayIndex = this.state.displayIndex + 4 
    this.setState({displayIndex: newDisplayIndex})
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushis={this.displayFourSushis()}
          more={this.more}
          eat={this.eat}
          eaten={this.state.eaten}
           />
        <Table moneyLeft={this.state.money}
               eaten={this.state.eaten}/>
      </div>
    );
  }
}

export default App;