import React from "react";
import ReactDOM from "react-dom";
import Ripple from "react-ripples";
import people from "./data/people.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import "./styles.css";


class PersonDetailPage extends React.Component {
  // constructor(props){
  //   super(props)
  //   this.state={

  //   }
  // }

  UNSAFE_componentWillMount() {
    this.setState({
      firstName: this.props.person.firstName,
      lastName: this.props.person.lastName,
      phone: this.props.person.phone,
    });
  }

  handleChange = e => {
    var state = this.state;
    var index = e.target.name;
    state[index] = e.target.value;
    this.setState(state);
    console.log(state)
  };

  submit = e => {
    e.preventDefault();
    this.props.handleUpdate(this.state, this.props.person.key);
  };

  render() {
    return (
      <div>
        <div className="header-w-back">
          <Link to="/">
            <div className="label-link">
              <img  src="../back.svg" alt="icon_large"/>
              <h2 className="as-heading">{this.state.firstName}&nbsp;&nbsp;{this.state.lastName}</h2>   
            </div>
          </Link>
          
            <div className="label-btn" onClick={this.submit}>
              <img className="icon" src="../tick.svg" alt="icon"/>
              <Link to="/">
              <p className="label-text">Done</p>
              </Link>
            </div> 
        </div>
        <div className="new-contact-layout">
          <div className="greeting-avatar">
            <h1 className="light">👋 Hello!</h1>
            <img className="avatar-large" src={this.props.person.avatar} />
          </div>
            <div className="input">
              <img className="icon-large" src="../person.svg" alt="icon"/>
              <input className="textbox" value={this.state.firstName}
                name="firstName" onChange={this.handleChange} />
              <input className="textbox" value={this.state.lastName}
                name="lastName" onChange={this.handleChange} />
            </div>
            <div className="input">
              <img className="icon-large" src="../phone.svg" alt="icon"/>
              <input className="textbox" value={this.state.phone} pattern="\d*"
                name="phone" onChange={this.handleChange} />
            </div>
        </div>
      </div>
    );
  }
}

export default PersonDetailPage;