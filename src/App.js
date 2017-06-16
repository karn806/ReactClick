import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types'

class CrazyButton extends Component{
  onClick() {
    this.props.onClick()
  }
  onReset() {
    this.props.onReset()
  }
  render() {
    return (
      <div>
        <button className='cuteButton' onClick={() => this.onClick()}>
          {this.props.title}
        </button>
        <button onClick={() => this.onReset()}>
          Reset
        </button>
        <p>{this.props.nclick}</p>
      </div>
    );
  }
}

CrazyButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  nClick: PropTypes.number
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicks: [0,0,0]
    }
  }
  onChildClick(nChild) {
    this.setState((st) => {
      // ... <-- copy array (space operator)
     const newClick = [... st.clicks]
     newClick[nChild]+=1
     console.log(newClick);
      return {
        clicks: newClick
      }
    })
  }
  onChildReset(nChild) {
    this.setState((st) => {
      const resetClick = [... st.clicks]
      resetClick[nChild] = 0
      return {
        clicks: resetClick
      }
    })
  }
  onResetAll() {
    this.setState((st) => {
      return {
        clicks: [0,0,0]
      }
    })
  }
  render() {
    return (
      <div>
        {[0,1,2].map((x) => (
          <CrazyButton
            key={x}
            title={'Button '+(x+1)}
            onClick={() => this.onChildClick(x)}
            onReset={() => this.onChildReset(x)}
            nclick={this.state.clicks[x]}
          />
        ))}
        <p> Total: {this.state.clicks.reduce((a,b) => a+b,0)}</p>
          <button onClick={() => this.onResetAll()}>
            Reset All
          </button>
      </div>
    );
  }
}

export default App;
