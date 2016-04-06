import React from 'react';
import ActiveContract from './activeContract';
import {getUser, updateUser, getContractData} from '../server';
import {Link } from 'react-router';

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
      activeContracts: []
    };
  }

  refresh() {
    getUser(this.props.user, (data) => {
      this.setState(data);
    });
      getContractData(this.props.user, data => {
      this.setState({
        activeContracts : data
      });
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
        this.setState({title: e.target.value});
        break;
      case "experience":
        this.setState({budget: e.target.value});
        break;
      case "about":
        this.setState({deadline: e.target.value});
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
                          <h4>Skills <Link to="/editprofile"><span className="glyphicon glyphicon-edit maintext"></span></Link> </h4>
                        <ul>
                          {this.state.skills}
                        </ul>
                          <h4> Experience <Link to="/editprofile"><span className="glyphicon glyphicon-edit maintext"></span></Link> </h4>
                        <ul>
                          {this.state.experience}
                          <br />
                        </ul>
                        <div className="media-body">
                          <h4>About me <Link to="/editprofile"><span className="glyphicon glyphicon-edit maintext"></span></Link></h4>
                          {this.state.about}
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
                              <h4>Active</h4>
                            <div className= "contract">
                                {this.state.activeContracts.map((contract, i) => {
                                  return (
                                    <ActiveContract key={i} data={contract}/>
                                  )
                                })}
                                {this.state.activeContracts[1]}
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
                        <div className="panel-title headertext"><h3>Contact Info <Link to="/editprofile"><span className="glyphicon headertext glyphicon-edit"></span></Link></h3></div>
                      </div>
                      <div className="panel-body">
                        {this.state.contact}
                        <hr />
                        <address>
                          <strong>Email</strong><br />
                          {this.state.email}
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
