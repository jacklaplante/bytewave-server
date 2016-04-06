import React from 'react';
import {getUser} from '../server';
import {Link } from 'react-router';

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      _id: -1,
      company: "",
      fullName: "",
      title: "",
      type: "",
      contract: [],
      skills: "",
      experience:"",
      about: "",
      email: "",
      contact: "",
      rating: ""
    };
  }

  refresh() {
    getUser(this.props.user, (userData) => {
      this.setState(userData);
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
                            <img src="img/private_profile.png" height="10%" />
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
                            <h3>About this developer</h3>
                            <hr />
                          <h4>Skills</h4>
                          <textarea className="form-control" rows="4" placeholder={this.state.skills} skills={this.state.skills} onChange={(e) => this.handleChange(e, "skills")} />
                          <br />
                          <h4> Experience</h4>
                          <textarea className="form-control" rows="4" placeholder={this.state.experience} experience={this.state.experience} onChange={(e) => this.handleChange(e, "experience")} />
                          <br />
                        <div className="media-body">
                          <h4>About me</h4>
                          <textarea className="form-control" rows="4" placeholder={this.state.about} about={this.state.about} onChange={(e) => this.handleChange(e, "about")} />
                        </div>
                        <Link to="/privateprofile" className="btn pull-right" onClick={(e) => this.handleSave(e)}>
                          Save
                        </Link>
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
                              <h4>Active</h4>
                            <div className= "contract">

                            </div>
                              <hr />
                              <h4>History</h4>
                            <div className = "contract">

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
                        <input type="text" className="form-control" id="form-contact" placeholder={this.state.contact} contact={this.state.contact} onChange={(e) => this.handleChange(e)} />
                        <hr />
                        <address>
                          <strong>Email</strong><br />
                          <input type="text" className="form-control" id="form-email" placeholder={this.state.email} email={this.state.email} onChange={(e) => this.handleChange(e)} />
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
