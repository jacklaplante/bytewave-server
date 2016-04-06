import React from 'react';
//import {Link} from 'react-router';

 export default class ActiveContract extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = props.data;
//   }
   render() {
     return (
       <div>
       <div className= "activeContract">
         <a href="#">{this.props.author}</a><br />
         {this.props.startend}: {this.props.date}<br />
       <a href="#">{this.props.title}</a>
       </div>
       </div>
     )
   }
 }
