import React from 'react';
import {Link} from 'react-router'

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    var data = this.props.data;
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title"><Link to="/contract">{data.title}</Link>
            <div className="pull-right">
              <a href="#" className="headertext">{data.author.company}</a>
            </div>
          </h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-12">
              <p className="block-with-text">
                <strong>Description:</strong> {data.description}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <p><br /><strong>Budget:</strong> <span className="text-muted">{data.budget}</span></p>
              <p><strong>Deadline:</strong> <span className="text-muted">{data.deadline}</span></p>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-default" style={{marginTop: 25 + 'px'}} onClick={() => this.props.previewContract(data)}>Preview</button>
            </div>
          </div>
        </div>
        <div className="panel-footer">
          tags:
          {data.tags.map((tag, i) => {return (
            /* returns the link in a span so that the elements are inline,
               but still have a space between each link*/
            <span key={i}>
              {' '}<a href="#">{tag}</a>
            </span>
            );
          })}
        </div>
      </div>
    );
  }
}
