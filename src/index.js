import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from "axios"
import reportWebVitals from './reportWebVitals';

class Webagr extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoWindows: Array(9).fill("infoWindowNest"),
      content: Array(9).fill("null"),
      search: "",
      alertText: "",
      submitAt: "",
      getText: ""
    }
    this.handleClear = this.handleClear.bind(this);
  }
  handleClear(i) {
    const infoWindows = this.state.infoWindows.slice()
    const content = this.state.content.slice()
  
    infoWindows[i] = "infoWindowNest"
    content[i] = ""

    
    for (let j = i + 1; j < 9; j++) {
      if (infoWindows[j] == "infoWindowNestBusy") {

        infoWindows[j-1] = "infoWindowNestBusy"
        content[j-1] = content[j]
        
        infoWindows[j] = "infoWindowNest"
        content[j] = ""
      }
    }
    this.setState({infoWindows: infoWindows})
    this.setState({content: content})
  }
  handleSubmit = props => {
    const infoWindows = this.state.infoWindows.slice()
    const content = this.state.content.slice()

    let i = 0
    while(true) {
      if (infoWindows[i] === "infoWindowNest") {
        infoWindows[i] = "infoWindowNestBusy"
        content[i] = this.state.search
        break
      }
      if (i === 8) {
        this.setState({alertText: "Limit on parallel feeds is exceeded"})
        break
      }
      i++
    }
    
    this.setState({infoWindows: infoWindows})
    this.setState({content: content})

    // ***************************************************************
    const article = { title: 'React PUT Request Example' };
    const headers = { 
      'keyword': this.state.search
    };
    //Отсылаем запрос и сразу слушаем ответ
    axios.put('https://reqres.in/api/articles/1', { headers })
      .then(response => this.setState({ submitAt: response.data.updatedAt }));
    axios.get('https://reqres.in/api/articles/1').then(response => {
      this.setState({getText: response.text})
    })
    // ***************************************************************
  }
  onChange = (e) => {
    this.setState({search: e.target.value})
  }
  renderInfoWindow(i) {
    return (
      <InfoWindow
        busy={this.state.infoWindows[i]}
        content={this.state.content[i]}
      />
    )
  }
  render() {
    return (
      <div className='webagr'>
        <div className='searchBar'>
          <Search 
            onChange={this.onChange}
            search={this.state.search}
            onSubmit={() => this.handleSubmit()}
          />
        </div>
        <div className='alert'>
          <Alert 
            alertText={this.state.alertText}
          />
        </div>
        <div className='frame'>
          <div className='frameRow'>
            <div className={this.state.infoWindows[0]}>
              {this.renderInfoWindow(0)}
              <button className='clearBtn' onClick={() => {this.handleClear(0)}}>
                X
              </button>
            </div>
            <div className={this.state.infoWindows[1]}>
              {this.renderInfoWindow(1)}
              <button className='clearBtn' onClick={() => {this.handleClear(1)}}>
                X
              </button>
            </div>
            <div className={this.state.infoWindows[2]}>
              {this.renderInfoWindow(2)}
              <button className='clearBtn' onClick={() => {this.handleClear(2)}}>
                X
              </button>            
            </div>
          </div>
          <div className='frameRow'>
            <div className={this.state.infoWindows[3]}>
              {this.renderInfoWindow(3)}
              <button className='clearBtn' onClick={() => {this.handleClear(3)}}>
                X
              </button>
            </div>
            <div className={this.state.infoWindows[4]}>
              {this.renderInfoWindow(4)}
              <button className='clearBtn' onClick={() => {this.handleClear(4)}}>
                X
              </button>
            </div>
            <div className={this.state.infoWindows[5]}>
              {this.renderInfoWindow(5)}
              <button className='clearBtn' onClick={() => {this.handleClear(5)}}>
                X
              </button>
            </div>
            </div>
            <div className='frameRow'>
            <div className={this.state.infoWindows[6]}>
              {this.renderInfoWindow(6)}
              <button className='clearBtn' onClick={() => {this.handleClear(6)}}>
                X
              </button>
            </div>
            <div className={this.state.infoWindows[7]}>
              {this.renderInfoWindow(7)}
              <button className='clearBtn' onClick={() => {this.handleClear(7)}}> 
                X
              </button>
            </div>
            <div className={this.state.infoWindows[8]}>
              {this.renderInfoWindow(8)}
              <button className='clearBtn' onClick={() => {this.handleClear(8)}}>
                X
              </button>
            </div>
          </div>
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
        <button className='searchBtn' onClick={this.props.onSubmit}>
          Search
        </button>
      </div>
    )
  }
}

function InfoWindow(props) {
  return (
    <div className="infoWindowBusy">
      <p>
        {props.content}
      </p>
    </div>
  )
}

function Alert(props) {
  return (
    <div className='alertMessage'>
      {props.alertText}
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
