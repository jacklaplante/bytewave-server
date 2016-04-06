import React from 'react';
import ActiveContract from './activeContract';
import {hideElement} from '../util';
import {getUser, updateUser} from '../server';

function countLines(str) {
  var count = 1;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '\n') {
      count++;
    }
  }
  return count;
}

export default class PrivateProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      _id: -1,
      company: "",
      fullName: "",
      title: "",
      type: "",
      contracts: [],
      skills: "",
      experience:"",
      about: "",
      email: "",
      contact: "",
      rating: "",
      reviews: [],
      activeContracts: [],
      editing: false,
      editSubmitted: false,
      editedValue: ''
    };
  }


  refresh() {
    getUser(this.props.user, (data) => {
      this.setState(data);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  handleSave(e){
    e.preventDefault();
    this.props.onSave(this);
  }

  handleChange(e, field){
    e.preventDefault();
    switch(field){
      case "skills":
        this.setState({skills: e.target.value});
        break;
      case "experience":
        this.setState({experience: e.target.value});
        break;
      case "about":
        this.setState({about: e.target.value});
        break;
        case "contact":
          this.setState({contact: e.target.value});
          break;
        case "email":
          this.setState({email: e.target.value});
          break;
    }
  }

  onEditClick(e) {
    e.preventDefault();
    this.setState({
      editing: true,
      editSubmitted: false,
      editedValue: this.props.value
    });
  }

  onEditCancel(e) {
    e.preventDefault();
    this.setState({
      editing: false,
      editSubmitted: false
    });
  }

  onEdit(e) {
    e.preventDefault();
    updateUser(this.state._id, this.state, () => {
      this.refresh();
    });
    this.setState({
      editing: false,
      editSubmitted: true
    });
  }

  handleEditChange(e) {
    e.preventDefault();
    this.setState({ editedValue: e.target.value });
  }

  componentWillReceiveProps() {
    if (this.state.editing && this.state.editSubmitted) {
      this.setState({
        editing: false,
        editSubmitted: false
      });
    }
  }

  render() {
    return (
      <div>
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="panel panel-primary panelfill">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="media">
                          <div className="media-left media-top">
                            <img src= {this.state.image} height="10%" />
                            <a className= "headertext" href="#">Edit picture?</a>
                          </div>
                          <div className="media-body headertext">
                            <h1>{this.state.fullName}</h1>
                            <h4>{this.state.title}</h4>
                            <h4>
                              Rating: {this.state.rating}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className= "panel-body">
                    <div className="row">
                      <div className="col-md-10">
                            <h3>Profile</h3>
                              <ul className={hideElement(this.state.editing)}><a onClick={(e) => this.onEditClick(e)}>Edit</a></ul>
                              <ul className={hideElement(!this.state.editing)}><a onClick={(e) => this.onEditCancel(e)} disabled={this.state.editSubmitted}>Cancel</a> <ul className={hideElement(!this.state.editing)}><a onClick={(e) => this.onEdit(e)} disabled={this.state.editSubmitted}>Submit</a></ul></ul>
                            <hr />
                          <h4>Skills</h4>
                            <span className={hideElement(!this.state.editing)}>
                              <textarea disabled={this.state.editSubmitted} className="form-control" placeholder={this.state.skills} rows={countLines(this.state.skills).toString()} value={this.state.editedValue} onChange={(e) => this.handleChange(e, "skills")} />
                            </span>
                        <span className={hideElement(this.state.editing)}>
                        <ul>
                          {this.state.skills}
                        </ul>
                      </span>
                          <h4> Experience</h4>
                            <span className={hideElement(!this.state.editing)}>
                              <textarea disabled={this.state.editSubmitted} className="form-control" placeholder={this.state.experience} rows={countLines(this.state.experience).toString()} value={this.state.editedValue} onChange={(e) => this.handleChange(e, "experience")} />
                            </span>
                            <span className={hideElement(this.state.editing)}>
                        <ul>
                          {this.state.experience}
                        </ul>
                      </span>
                        <div className="media-body">
                          <h4>About me</h4>
                            <span className={hideElement(!this.state.editing)}>
                              <textarea disabled={this.state.editSubmitted} className="form-control" placeholder={this.state.about} rows={countLines(this.state.about).toString()} value={this.state.editedValue} onChange={(e) => this.handleChange(e, "about")} />
                            </span>
                          <span className={hideElement(this.state.editing)}>
                            <ul>
                          {this.state.about}
                        </ul>
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-5">
                    <div className="panel panel-default panelfill">
                      <div className="panel-heading">

                        <div className="row">
                          <div className="col-md-5">
                            <div className="media">
                              <div className="media-body headertext">
                                <h3>Projects</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className= "panel-body">
                        <ul className="media-list">
                            <div className="media-body">
                            <div className= "contract">
                                {this.state.contracts.map((contract) => {
                                  return (
                                    <ActiveContract key={contract._id} data={contract}/>
                                  )
                                })}
                            </div>
                            </div>
                        </ul>
                      </div>
                    </div>
                    <div className="panel panel-default panelfill">
                      <div className="panel-heading">
                        <div className="panel-title headertext"><h3>Contact Info</h3></div>
                      </div>
                      <div className="panel-body">
                        <span className={hideElement(!this.state.editing)}>
                          <textarea disabled={this.state.editSubmitted} className="form-control" placeholder={this.state.contact} rows={countLines(this.state.contact).toString()} value={this.state.editedValue} onChange={(e) => this.handleChange(e, "contact")} />
                        </span>
                        <span className={hideElement(this.state.editing)}>
                        {this.state.contact}
                      </span>
                        <hr />
                        <address>
                          <strong>Email</strong><br />
                            <span className={hideElement(!this.state.editing)}>
                              <textarea disabled={this.state.editSubmitted} className="form-control" placeholder={this.state.email} rows={countLines(this.state.email).toString()} value={this.state.editedValue} onChange={(e) => this.handleChange(e, "email")} />
                            </span>
                            <span className={hideElement(this.state.editing)}>
                          {this.state.email}
                        </span>
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
</div>
    )
  }
}
