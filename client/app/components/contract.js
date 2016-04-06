import React from 'react';
import {getUser, getContractData} from '../server'

export default class Contract extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
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

  render(){
    var data = this.props.data
    return(
  <div>
    <link href="css/contractor.css" rel="stylesheet" />
      <div className="container maintext">
        <div className="row">
          <div className="col-md-8">
            <h1>{data.title}</h1>
            <h3>Company: {data.company}</h3>
            <h5>Budget: <span className="text-muted">{data.budget}</span> Deadline: <span className="text-muted">{data.deadline}</span></h5>
            <h4>Project Description</h4>
            <p>{data.description}</p>
            <h4>Skills Required</h4>
              <ul>
                {data.skills.map((skill, i) => {
                  return (
                    <li key={i}>{skill}</li>
                  );
                })}
              </ul>
            <div className="panel panel-primary panelfill">
              <div className="panel-heading">
                <h5 className="panel-title tags">Tags</h5>
              </div>
              <div className="panel-body tags">
                <h6 className="tags"> {data.tags}</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default panelfill">
              <div className="panel-heading">
                <h3 className="panel-title headertext">About Us</h3>
              </div>
              <div className="panel-body">
                <p>{data.author.about}</p>
                <address>
                  <strong>{data.author.company}</strong><br />
                  {data.author.contact}
                </address>
                <address>
                  <strong>{data.author.company}</strong><br />
                  <a href="mailto:#">{data.author.email}</a>
                </address>
              </div>
            </div>
            <div className="panel panel-default panelfill">
              <div classNameName="panel-heading">
                <h3 className="panel-title headertext">Job Postings History</h3>
              </div>
              <div className="panel-body">
                <p>Thus far, This is the first job UCombinator has posted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
