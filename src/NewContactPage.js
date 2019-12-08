import React from "react";
import ReactDOM from "react-dom";
import Ripple from "react-ripples";
import people from "./data/people.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles.css";


class NewContactPage extends React.Component {
  UNSAFE_componentWillMount() {
    this.setState({
      firstName: "",
      lastName: "",
      phone: ""
    });
  }

  handleChange = e => {
    var state = this.state;
    var index = e.target.name;
    state[index] = e.target.value;
    this.setState(state);
    // console.log(state)
  };

  submit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  };

  render() {
    return (
      <div>
        <div className="header-w-back">
        <Link to="/">
            <div className="label-link">
              <img  src="../back.svg" alt="icon_large"/>
              {/* <p className="label-link-text">Back</p> */}
              <h2 className="as-heading">New Contact</h2>   
            </div>
          </Link>
          <div className="label-btn" onClick={this.submit}>
            <img className="icon" src="../tick.svg" alt="icon"/>
            <p className="label-text">Done</p>
          </div> 
        </div>
        <div className="new-contact-layout">
          <div className="greeting-avatar">
            <h1 className="light">👋 Hello!</h1>
            <img className="avatar-large" src="../pic7.png" />
          </div>
            <div className="input">
              <img className="icon-large" src="../person.svg" alt="icon"/>
              <input className="textbox" placeholder="First name" 
                name="firstName" onChange={this.handleChange} />
              <input className="textbox" placeholder="Last name"
                name="lastName" onChange={this.handleChange} />
            </div>
            <div className="input">
              <img className="icon-large" src="../phone.svg" alt="icon"/>
              <input className="textbox" placeholder="Phone" type="number" pattern="\d*"
                name="phone" onChange={this.handleChange} />
            </div>
        </div>
      </div>
    );
  }
}

export default NewContactPage;