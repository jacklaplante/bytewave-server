import React from 'react';
import {Link } from 'react-router';
import {readDocument} from '../database.js';

function unixTimeToString(time) {
  return new Date(time).toLocaleString();
}

 export default class Review extends React.Component {
   render() {
     return (
       <div>
       <div className= "review">
         <Link to={"/publicProfile/" + this.props.author}>{getUserObject(this.props.author).fullName}</Link><br />
         {unixTimeToString(this.props.date)}
         <br />{this.props.children}
       </div>
       </div>
     )
   }
 }
