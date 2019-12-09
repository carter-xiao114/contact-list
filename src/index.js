import React from "react";
import ReactDOM from "react-dom";
import people from "./data/people.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles.css";

import ContactsPage from "./ContactsPage";
import NewContactPage from "./NewContactPage";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    }
  }

  UNSAFE_componentWillMount() {
    people.forEach(person => this.add(person));
  }

  add = newPerson => {
    var arr = this.state.people;
    var profile = {
      key: this.uniqueID(),
      firstName: newPerson.firstName,
      lastName: newPerson.lastName,
      phone: newPerson.phone,
      avatar: "../pic" + this.randomPic() + ".png"
    }
    arr.push(profile);
    this.setState({ people: arr });
    console.log(profile)
  }

  randomPic = () => {
    return Math.floor(Math.random() * 16) + 1;
  };

  uniqueID = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };


  // onClick = (newPerson) => {
  //   // this.child.current.add(newPerson);
  //   this.setState({person:newPerson})
  // };

  

  render(){
    return(
      // <div>
      //   <ContactsPage ref={this.child} />
      //   <NewContactPage handleSubmit={newPerson => this.onClick(newPerson) } />
      // </div>
      <Router>
        <div>
          <Route exact path="/" 
            render={()=> <ContactsPage people={this.state.people} />} />
          <Route path="/add" 
            render={()=> <NewContactPage handleSubmit={newPerson => this.add(newPerson) } />} />
        </div>
      </Router>

      // <Router>
      //   <div>
      //     <Route exact path="/" 
      //       render={()=> <ContactsPage ref={instance => { this.contacts = instance; }} />} />
      //     <Route path="/add" 
      //       render={()=> <NewContactPage handleSubmit={e => this.contacts.add(e) } />} />
      //   </div>
      // </Router>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
