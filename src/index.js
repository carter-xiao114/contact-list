import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles.css";

import ContactsPage from "./ContactsPage";
import NewContactPage from "./NewContactPage";

class App extends React.Component{
  render(){
    return(
      // <div>
      //   <ContactsPage ref={instance => { this.contacts = instance; }} />
      //   <NewContactPage handleSubmit={e => this.contacts.add(e) } />
      // </div>
      <Router>
      <div>
        <Route exact path="/" component={ContactsPage} />
        <Route path="/add" component={NewContactPage} />
      </div>
    </Router>
    )
  }


}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
