import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Webagr extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoWindows: Array(9).fill("infoWindow"),
      content: Array(9).fill("null"),
      search: ""
    }
  }
  handleClick = props => {
    const infoWindows = this.state.infoWindows.slice()
    const content = this.state.content.slice()

    infoWindows[0] = "infoWindowBusy"
    content[0] = this.state.search
    
    this.setState({infoWindows: infoWindows})
    this.setState({content: content})
  }
  onChange = (e) => {
    this.setState({search: e.target.value})
  }
  render() {
    return (
      <div className='webagr'>
        <div className='searchBar'>
          <Search 
            onChange={this.onChange}
            search={this.state.search}
            onClick={() => this.handleClick()}
          />
        </div>
        <div className='frame'>
          <Frame 
          infoWindowsStatus={this.state.infoWindows}
          infoWindowsContent={this.state.content}
          />
        </div>
      </div>
    )
  }
}

class Search extends React.Component {
  render() {
    return (
      <div className='searchBar'>
        <input type="text" onChange={this.props.onChange} value={this.props.search}/> 
        <button className='searchBtn' onClick={this.props.onClick}>
          Search
        </button>
      </div>
    )
  }
}

class Frame extends React.Component {
  renderInfoWindow(i) {
    return (
      <InfoWindow
        busy={this.props.infoWindowsStatus[i]}
        content={this.props.infoWindowsContent[i]}
      />
    )
  }
  render() {
    return (
      <div className='frame'>
        <div className='frameRow'>
          {this.renderInfoWindow(0)}
          {this.renderInfoWindow(1)}
          {this.renderInfoWindow(2)}
        </div>
        <div className='frameRow'>
          {this.renderInfoWindow(3)}
          {this.renderInfoWindow(4)}
          {this.renderInfoWindow(5)}
        </div>
        <div className='frameRow'>
          {this.renderInfoWindow(6)}
          {this.renderInfoWindow(7)}
          {this.renderInfoWindow(8)}
        </div>
      </div>
    )
  }
}

function InfoWindow(props) {
  return (
    <div className={props.busy}>
      <p>
        {props.content}
      </p>
    </div>
  )
}

ReactDOM.render(
  <Webagr />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
