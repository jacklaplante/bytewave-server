import React from 'react';

export default class ContractForm extends React.Component {
  constructor(props){
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

  handleSave(e){
    e.preventDefault();
    this.props.onSave(this);
  }

  handleChange(e, field){
    e.preventDefault();
    switch(field){
      case "title":
        this.setState({title: e.target.value});
        break;
      case "budget":
        this.setState({budget: e.target.value});
        break;
      case "deadline":
        this.setState({deadline: e.target.value});
        break;
      case "description":
        this.setState({description: e.target.value});
        break;
      case "skills":
        this.setState({skills: e.target.value});
        break;
      case "tags":
        this.setState({tags: e.target.value});
        break;
    }
  }

  render(){
    return(
      <div>
        <link href="css/contractor.css" rel="stylesheet" />
        <div className="row">
          <div className="col-md-8">
            <form>
              <input type="text" className="form-control form-group" id="form-title" placeholder="Title" name={this.state.name} onChange={(e) => this.handleChange(e, "title")} />
              <h3 className="company-name">Company: UCombinator</h3>
              <div className="form-group form-inline budget-deadline">
                <div className="form-group">
                  <label htmlFor="form-budget">Budget:</label>
                  <div className="input-group">
                    <div className="input-group-addon">$</div>
                    <input type="text" className="form-control" id="form-budget" placeholder="Amount" budget={this.state.budget} onChange={(e) => this.handleChange(e, "budget")} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="form-deadline">Deadline:</label>
                  <input type="date" className="form-control" id="form-deadline" deadline={this.state.deadline} onChange={(e) => this.handleChange(e, "deadline")} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="form-description">Project Description</label>
                <textarea className="form-control" rows="4" description={this.state.description} onChange={(e) => this.handleChange(e, "description")} />
              </div>
              <div className="form-group">
                <label htmlFor="form-description">Skills Required</label>
                <textarea className="form-control" rows="3" skills={this.state.skills} onChange={(e) => this.handleChange(e, "skills")} />
              </div>
              <div className="panel panel-primary panelfill">
                <div className="panel-heading">
                  <h5 className="panel-title tags">Tags</h5>
                </div>
                <div className="panel-body tags">
                  <input type="text" className="form-control" id="form-tags" placeholder="tag1 tag2 tag3..." tags={this.state.tags} onChange={(e) => this.handleChange(e, "tags")} />
                </div>
              </div>
              <button type="button" className="btn btn-default pull-right" onClick={(e) => this.handleSave(e)}>
                Save
              </button>
            </form>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default panelfill">
              <div className="panel-heading">
                <h3 className="panel-title headertext">About Us</h3>
              </div>
              <div className="panel-body">
                <p>UCombinator is a fairly new product developed by two genuine programmers that helps the in-class experience when it comes to group projects. Not only does this company form groups that contain all skills needed to be successful in group work, they also have come out with a grading system that takes commits pushed to github as a groups submission.</p>
                <address>
                  <strong>Bytewave</strong><br />
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
              <div className="panel-heading">
                <h3 className="panel-title headertext">Job Postings History</h3>
              </div>
              <div className="panel-body">
                <p>Thus far, This is the first job UCombinator has posted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
