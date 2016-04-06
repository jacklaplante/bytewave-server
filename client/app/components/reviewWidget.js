import React from 'react';
import ReviewEntry from './reviewEntry';

export default class ReviewWidget extends React.Component{
  render(){
    return(
      <div className= "panel-body">
        <ul className="media-list">
          {React.Children.map(this.props.children, function(child) {
            return (
              <li className="media">
                {child}
              </li>
            )
          })}
          <li className = "media">
            <ReviewEntry onPost={this.props.onPost}/>
          </li>
        </ul>
      </div>
    )
  }
}
