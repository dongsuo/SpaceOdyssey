import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import './App.scss';
import Index from './pages/index'
import About from './pages/about'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class App extends Component {

  constructor() {
    super()
    this.state = {
      showMenu: false
    }
  }

  componentDidMount() {
    this.unlisten = history.listen((location, action) => {
      // location is an object like window.location
      console.log(action, location.pathname, location.state);
      this.setState({
        showMenu: !this.state.showMenu
      })
    });
  }

  componentWillUnmount() {
    this.unlisten()
  }

  handleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <div className={`header ${this.state.showMenu ? 'opened-header' : ''}`}>
            {this.state.showMenu ? < i className="iconfont icon-baseline-close-px" onClick={this.handleMenu.bind(this)}></i> : <i className="iconfont icon-menu" onClick={this.handleMenu.bind(this)}></i>}
            {this.state.showMenu ?
              <ul className="menu-wrapper">
                <li><Link to="/">首页</Link></li>
                <li><Link to="/about"> 关于</Link></li>
              </ul> : ''}
          </div>
          <Route path="/" component={Index} />
          <Route path="/about" component={About} />
        </div >
      </Router>
    );
  }
}

export default App;
