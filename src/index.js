import React from "react";
import ReactDOM from "react-dom";
import people from "./data/people.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles.css";

import ContactsPage from "./ContactsPage";
import NewContactPage from "./NewContactPage";
import { string } from "prop-types";
import PersonDetailPage from "./PersonDetailPage.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      path: "-",
      selectedPerson: {}
    };
  }

  UNSAFE_componentWillMount() {
    people.forEach(person => this.add(person));
    this.lookUp(this.state.path);
  }

  add = newPerson => {
    var arr = this.state.people;
    var profile = {
      key: this.uniqueID(),
      firstName: newPerson.firstName,
      lastName: newPerson.lastName,
      phone: newPerson.phone,
      avatar: "../pic" + this.randomPic() + ".png"
    };
    arr.push(profile);
    this.setState({ people: arr });
    // console.log(profile)
  };

  lookUp = path => {
    if (path !== "") {
      var StrArray = path.split("-");
      var id = StrArray[StrArray.length - 1];
      var arr = this.state.people;
      this.setState({
        selectedPerson: arr.filter(person => person.key === id)[0]
      });
      console.log(arr.filter(person => person.key === id)[0]);
    }
  };

  updatePerson = (newState, key) => {
    var arr = this.state.people;
    var person = arr.filter(person => person.key === key)[0];
    person.firstName = newState.firstName;
    person.lastName = newState.lastName;
    person.phone = newState.phone;
    this.setState({ people: arr });
    // console.log(arr)
  };

  randomPic = () => {
    return Math.floor(Math.random() * 16) + 1;
  };

  uniqueID = () => {
    return (((1 + Math.random()) * 0x10000000000000) | 0)
      .toString(32)
      .substr(1);
  };

  pathFormat(path) {
    this.setState({ path: "/" + path });
    this.lookUp(path);
  }

  render() {
    console.log(" current " + this.state.path);
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <ContactsPage
                people={this.state.people}
                pathFormat={id => this.pathFormat(id)}
              />
            )}
          />
          <Route
            path="/add"
            render={() => (
              <NewContactPage handleSubmit={newPerson => this.add(newPerson)} />
            )}
          />
          <Route
            path={this.state.path}
            render={() => (
              <div>
                <PersonDetailPage
                  person={this.state.selectedPerson}
                  handleUpdate={(newState, key) =>
                    this.updatePerson(newState, key)
                  }
                />
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
