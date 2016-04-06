import React from 'react';
import {getTags} from '../server';

export default class AdvancedSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hoveredIndex: -1,
      clickIndex: -1,
      mouseClicked: false,
      tags: []
    }
  }

  refresh(){
    getTags((results) => {
      this.setState({
        hoveredIndex: this.state.hoveredIndex,
        clickIndex: this.state.clickIndex,
        mouseClicked: this.state.mouseClicked,
        tags: results
      });
    });
  }

  componentDidMount(){
    this.refresh();
  }

  click(index){
    this.setState({
      hoveredIndex: this.state.hoveredIndex,
      clickIndex: index,
      mouseClicked: true,
      tags: this.state.tags
    });
  }

  hover(index){
    this.setState({
      hoveredIndex: index,
      clickIndex: this.state.clickIndex,
      mouseClicked: this.state.mouseClicked,
      tags: this.state.tags
    });
  }

  leave(){
    if(!this.state.mouseClicked){
      this.setState({
        hoveredIndex: -1,
        clickIndex: this.state.clickIndex,
        mouseClicked: false,
        tags: this.state.tags

      });
    }
  }

  render() {
    var ratings = [];
    for(var i = 0; i < 5; i++){
      let className = 'glyphicon';
      if(this.state.clickIndex > -1){
        if(i <= this.state.clickIndex){
          className += ' glyphicon-star';
        }else{
          className += ' glyphicon-star-empty';
        }
      }else{
        if (i <= this.state.hoveredIndex){
          className += ' glyphicon-star';
        }else{
          className += ' glyphicon-star-empty';
        }
      }
      ratings.push(
        <button key={i} id={'star' + (i + 1)} type="button" className="btn btn-default" onMouseEnter={this.hover.bind(this, i)} onMouseLeave={this.leave.bind(this)} onClick={this.click.bind(this)}><span className={className}></span></button>
      );
    }

    var tags = [];
    for(i = 0; i < this.state.tags.length; i++){
      tags.push(
        <button key={i} className="btn btn-default tag-button" type="button">#{this.state.tags[i]}</button>
      );
    }

    return (
      <div className="panel panel-default panelfill">
        <div className="panel-heading">
          <h4 className="text-center headertext"><strong>Advanced Search</strong></h4>
        </div>

        <div className="panel-body">
          <fieldset className="form-group text-center" style={{marginLeft: 5 + 'px', marginRight: 5 + 'px'}}>
            <label htmlFor="sortBy">Sort by</label>
            <select className="form-control" id="sortBy">
              <option>Most Recent</option>
              <option>Popular</option>
              <option>Budget Ascending</option>
              <option>Budget Descending</option>
            </select>
          </fieldset>
        </div>
        <div className="panel-body">
          <div className="text-center search-rating">
            <p><strong>Minimum Rating</strong></p>
            <div className="btn-group">
              {ratings}
            </div>
        </div>
        </div>
        <div className="panel-body">
          <div className="text-center">
            <p><strong>Budget</strong></p>
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
          <p className="text-center"><strong>Tags</strong></p>
          {tags}
        </div>
        <div className="panel-footer text-center">
          <button className="btn btn-default" type="button" onClick={this.props.search}>Search</button>
        </div>
      </div>
    )
  }
}
