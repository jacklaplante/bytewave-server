import React from 'react';

export default class Contract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      budget: "",
      deadline: "",
      skills: "",
      tags: ""
    };
  }

  render(){
    return(
  <div>
    <link href="css/contractor.css" rel="stylesheet" />
      <div className="container maintext">
        <div className="row">
          <div className="col-md-8">
            <h1>{this.props.title}</h1>
            <h3>Company: {this.props.company}</h3>
            <h5>Budget: <span className="text-muted">{this.props.budget}</span> Deadline: <span className="text-muted">{this.props.deadline}</span></h5>
            <h4>Project Description</h4>
            <p>{this.props.description}</p>
            <h4>Skills Required</h4>
            <ul>
              {this.props.skills}
            </ul>
            <div className="panel panel-primary panelfill">
              <div className="panel-heading">
                <h5 className="panel-title tags">Tags</h5>
              </div>
              <div className="panel-body tags">
                <h6 className="tags"> {this.props.tags}</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default panelfill">
              <div className="panel-heading">
                <h3 className="panel-title headertext">About Us</h3>
              </div>
              <div className="panel-body">
                <p>UCombinator is a fairly new product developed by two genuine programmers that helps the in-className experience when it comes to group projects. Not only does this company form groups that contain all skills needed to be successful in group work, they also have come out with a grading system that takes commits pushed to github as a groups submission.</p>
                <address>
                  <strong>UCombinator</strong><br />
                  123 University Dr.<br />
                  Amherst, MA 01003<br />
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
                <address>
                  <strong>Full Name</strong><br />
                  <a href="mailto:#">first.last@umass.edu</a>
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
