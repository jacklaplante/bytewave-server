import React from 'react';

export default class ContractPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    var data = this.props.data;
    return (
      <div>
        <div className="panel panel-default panelfill">
          <div className="panel-heading">
            <h2 className="text-center headertext">{data.title}</h2>
          </div>
          <div className="panel-body">
            <p>
              <strong>Description:</strong>{data.description}
            </p>
            <div>
              <strong>Required Skills:</strong>
              <ul>
                {data.skills.map((skill, i) => {
                  return (
                    <li key={i}>{skill}</li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="panel panel-default panelfill">
          <div className="panel-heading">
            <h2 className="text-center headertext">{data.author.company}</h2>
          </div>
          <div className="panel-body">
            <p>
              <strong>About Us:</strong> {data.author.about}
            </p>
            <strong>Rating: </strong>
            <span className="glyphicon glyphicon-star"></span>
            <span className="glyphicon glyphicon-star"></span>
            <span className="glyphicon glyphicon-star"></span>
            <span className="glyphicon glyphicon-star-empty"></span>
            <span className="glyphicon glyphicon-star-empty"></span>
          </div>
        </div>
      </div>
    );
  }
}
