import React from "react";
import ReactDOM from "react-dom";
import Ripple from "react-ripples";
import people from "./data/people.json";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      search: ""
    };
  }

  UNSAFE_componentWillMount() {
    people.forEach(person => this.add(person));
  }

  search = e => {
    this.setState({ search: e.target.value });
    // console.log(e.target.value)
  };

  randomPic = () => {
    return Math.floor(Math.random() * 16) + 1;
  };

  add = newPerson => {
    var arr = this.state.people;
    var profile = {
      firstName: newPerson.firstName,
      lastName: newPerson.lastName,
      phone: newPerson.phone,
      avatar: "../pic" + this.randomPic() + ".png"
    };
    arr.push(profile);
    this.setState({ people: arr });
    // console.log(profile)
  };

  render() {
    return (
      <div>
        <div className="header">
          <h1>Contacts</h1>
          <img className="icon-large" src="../add-contact.svg" alt="icon" />
        </div>
        <SearchBar handleSearch={this.search} />
        <PeopleList people={this.state.people} search={this.state.search} />
        <AddPerson handleSubmit={this.add} />
        {/* <ContactsUI /> */}
      </div>
    );
  }
}

class PeopleList extends React.Component {
  uniqueID = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  // delete = (index) => {}

  // update = (index) => {}

  filtering(search) {
    return this.props.people.filter((person, i) => {
      var detail =
        person.firstName.toLowerCase() +
        person.lastName.toLowerCase() +
        person.phone;
      return detail.indexOf(search.toLowerCase()) !== -1;
    });
  }

  //copy from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  sorting = (a, b) => {
    var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
    var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  personHTML = (e, i) => {
    return (
      <Person
        key={this.uniqueID()}
        firstName={e.firstName}
        lastName={e.lastName}
        phone={e.phone}
        avatar={e.avatar}
      />
    );
  };

  renderResults() {
    var array = this.filtering(this.props.search).sort(this.sorting);

    if (array === undefined || array.length === 0) {
      return <div>No result</div>;
    }

    return array.map((e, i) => {
      //first char will always be on top
      if (i === 0) {
        return (
          <div>
            <h2>{e.firstName.substr(0, 1)}</h2>
            {this.personHTML(e, i)}
          </div>
        );
      }
      //when detect a difference,
      if (i >= 1 && i < array.length) {
        var a = e.firstName.substr(0, 1).toUpperCase();
        var b = array[i - 1].firstName.substr(0, 1).toUpperCase();
        if (a !== b) {
          // console.log(a.substr(0, 1))
          return (
            <div>
              <h2>{a.substr(0, 1)}</h2>
              {this.personHTML(e, i)}
            </div>
          );
          // for the rest of the list
        } else {
          return <div>{this.personHTML(e, i)}</div>;
        }
      }
    });
  }

  render() {
    return <div>{this.renderResults()}</div>;
  }
}

class SearchBar extends React.Component {
  //   <div className="search-box">
  //   <img src="../search.svg" />
  //   <input className="searching" placeholder="Name or phone number" />
  // </div>

  render() {
    return (
      <div className="search-box">
        <img src="../search.svg" alt="search" />
        <input
          className="searching"
          placeholder="Name or phone number"
          onChange={this.props.handleSearch}
        />
      </div>
    );
  }
}

class Person extends React.Component {
  // <h2>B</h2>
  // <div className="contact-item">
  //   <img className="avatar" src="../pic8.png" />
  //   <div className="info">
  //     <p className="_20px">John Doe</p>
  //     <p className="_14px">333 4567111</p>
  //   </div>
  // </div>

  render() {
    return (
      <div>
        <Ripple>
          <div className="contact-item">
            <img
              className="avatar"
              src={this.props.avatar}
              alt={this.props.firstName}
            />
            <div className="info">
              <p className="_20px">
                {this.props.firstName} {this.props.lastName}
              </p>
              <p className="_14px">{this.props.phone}</p>
            </div>
          </div>
        </Ripple>
      </div>
    );
  }
}

class AddPerson extends React.Component {
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
            <div className="label-link">
              <img  src="../back.svg" alt="icon_large"/>
              {/* <p className="label-link-text">Back</p> */}
              <h2 className="as-heading">New Contact</h2>
          </div>
          
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


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
