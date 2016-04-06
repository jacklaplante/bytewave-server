import React from 'react';
import ReactDOM from 'react-dom';
import ContractForm from './components/contractform';
import Contract from './components/contract';
import PrivateProfile from './components/privateProfile';
import PublicProfile from './components/publicProfile';
import Search from "./components/search";
import {resetDatabase} from './database';
import {saveContract} from './server';
import { IndexRoute, Router, Route, hashHistory, Link } from 'react-router';


class SearchPage extends React.Component {
  render() {
    return (
      <Search container={1} />
    );
  }
}

class ContractPage extends React.Component {
  render() {
    return <Contract user={1} />;
  }
}

class ContractFormPage extends React.Component {

  onSave(contractContents){
    saveContract(contractContents, () => {
      alert("it worked?")
    });
  }

  render() {
    return <ContractForm onSave={(contractContents) => this.onSave(contractContents)} />;
  }
}
  class PrivateProfilePage extends React.Component {
    render() {
      return <PrivateProfile user={1} />;
    }
}
class EditProfilePage extends React.Component {
  render() {
    return <EditProfile user={1} />;
  }
}
class PublicProfilePage extends React.Component {
  render() {
    return <PublicProfile user={1} />;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">
                <span className="glyphicon glyphicon-flash" aria-hidden="true"></span>
              </Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contractform">Create Contract</Link></li>
              </ul>
              <form className="navbar-form navbar-right">
                <input type="text" className="form-control" placeholder="Search..." onKeydown = "if (event.keyCode == 13){event.preventDefault(); document.getElementById('search').click();}" />
                <a href="search.html" className="hide" id="search"> </a>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a onClick={() => {
                    resetDatabase();
                    window.alert("Database reset! Refreshing the page now...");
                    document.location.reload(false);
                  }}>Reset Mock DB</a>
                </li>
                <li className="dropdown">
                  <Link to="/privateprofile" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" aria-hidden="true"></span> Welcome! <span className="caret"></span></Link>
                  <ul className="dropdown-menu">
                    <li><Link to="/privateprofile"><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Profile</Link></li>
                    <li><a href="#"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Settings</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#"><span className="glyphicon glyphicon-log-out" aria-hidden="true"></span> Log Out</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      <div>
        {this.props.children}
      </div>
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SearchPage} />
      <Route path="privateprofile" component={PrivateProfilePage} />
      <Route path="publicprofile" component={PublicProfilePage} />
      <Route path="contractform" component={ContractFormPage} />
      <Route path="contract" component={ContractPage} />
      <Route path="editprofile" component={EditProfilePage} />
    </Route>
  </Router>
),document.getElementById('contentContainer'));
