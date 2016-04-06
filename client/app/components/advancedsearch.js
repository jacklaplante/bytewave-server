import React from 'react';

export default class AdvancedSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contents: []
    }
  }

  render() {
    return (
      <div className="panel panel-default panelfill">
        <div className="panel-heading">
          <h4 className="text-center headertext"><strong>Advanced Search</strong></h4>
        </div>

        <div className="panel-body">
          <div className="dropdown text-center">
            Sort by:
            <button className="btn btn-default dropdown-toggle" type="button" id="menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              Most Recent
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu sort-by" aria-labelledby="menu">
              <li><a href="#">Popular</a></li>
              <li><a href="#"><font size="1">$</font><font size="2">$</font>$</a></li>
              <li><a href="#">$<font size="2">$</font><font size="1">$</font></a></li>
            </ul>
          </div>
        </div>
        <div className="panel-body">
          <div className="text-center search-rating">
            <p>Minimum Rating</p>
            <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-star-empty"></span></button>
            <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-star-empty"></span></button>
            <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-star-empty"></span></button>
            <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-star-empty"></span></button>
            <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-star-empty"></span></button>
          </div>
        </div>
        <div className="panel-body">
          <div className="text-center">
            <p>Budget</p>
            <div className="input-group">
              <p className="input-group-addon">Min: </p>
              <input type="text" className="form-control" />
            </div>
            <div className="input-group">
              <p className="input-group-addon">Max: </p>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="panel-body">
          <p className="text-center">Tags</p>
          <button className="btn btn-default tag-button" type="button">#java</button>
          <button className="btn btn-default tag-button" type="button">#css</button>
          <button className="btn btn-default tag-button" type="button">#javascript</button>
          <button className="btn btn-default tag-button" type="button">#ionic</button>
          <button className="btn btn-default tag-button" type="button">#angularjs</button>
          <button className="btn btn-default tag-button" type="button">#python</button>
          <button className="btn btn-default tag-button" type="button">#mysql</button>
          <button className="btn btn-default tag-button" type="button">#c</button>
          <button className="btn btn-default tag-button" type="button">#c++</button>
          <button className="btn btn-default tag-button" type="button">#scala</button>
          <button className="btn btn-default tag-button" type="button">#ruby</button>
        </div>
        <div className="panel-footer text-center">
          <button className="btn btn-default" type="button">Search</button>
        </div>
      </div>
    )
  }
}
