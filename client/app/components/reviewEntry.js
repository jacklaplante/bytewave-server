import React from 'react';

 export default class ReviewEntry extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       value: ""
     };
   }

   handleChange(e) {
     this.setState({ value: e.target.value });
   }

   handleKeyUp(e) {
     if (e.key === "Enter") {
       var review = this.state.value.trim();
       if (review !== "") {
         // Post review
         this.props.onPost(this.state.value);
         this.setState({ value: "" });
       }
     }
   }

   render() {
     return (
       <div>
         <div className="media-left media-top">
           PIC
         </div>
         <div className="media-body">
           <div className="input-group">
             <input type="text" className="form-control" placeholder="Write a review..."
               value={this.state.value} onChange={(e) => this.handleChange(e)}
               onKeyUp={(e) => this.handleKeyUp(e)} />
           </div>
         </div>
       </div>
     )
   }
 }
