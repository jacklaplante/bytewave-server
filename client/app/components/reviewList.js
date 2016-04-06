import React from 'react';

export default class ReviewList extends React.Component {
  render() {
    return (
      <ul className="media-list">
        {React.Children.map(this.props.children, function(child) {
          return (
            <li className="media">
              {child}
              <hr />
            </li>
          )
        })}
      </ul>
    )
  }
}
