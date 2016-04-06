import React from 'react';
import ReviewWidget from './reviewWidget';
import Review from './review';
import {getUser, postReview} from '../server';
import {Link } from 'react-router';

export default class PublicProfile extends React.Component {

  constructor(props) {
    super(props);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state ={
      _id: -1,
      company: "",
      fullName: "",
      title: "",
      type: "",
      contract: [],
      skills: "",
      experience:"",
      about: "",
      email: "",
      contact: "",
      rating: "",
      reviews: []
    };
  }

  handleReviewPost(reviewText) {
    postReview(this.state._id, 4, reviewText, (updatedFeedItem) => {
      this.setState(updatedFeedItem);
    });
  }

  refresh() {
    getUser(2, (userData) => {
      this.setState(userData);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    var data = this.state;
    return (
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="panel panel-primary panelfill">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="media">
                          <div className="media-left media-top">
                            <img src="img/public_profile.jpg" height="10%" />
                          </div>
                          <div className="media-body headertext">
                            <h1>{this.state.fullName}</h1>
                            <h4> {this.state.company}</h4>
                            <h4>
                              Rating: {this.state.rating}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className= "panel-body">
                    <div className="row">
                      <div className="col-md-10">
                            <h3>About this developer</h3>
                            <hr />
                          <h4>Skills </h4>
                        <ul>
                          {this.state.skills}
                        </ul>
                        <h4> Experience </h4>
                        <ul>
                          {this.state.experience}
                          <br />
                        </ul>
                        <div className="media-body">
                          <h4>About me </h4>
                            {this.state.about}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <div className="panel panel-default panelfill">
                  <div className="panel-heading">
                    <div className="panel-title headertext"><h3>Reviews</h3></div>
                  </div>
                  <ReviewWidget onPost={(reviewText) => this.handleReviewPost(reviewText)}>
                    {data.reviews.map((review, i) => {
                      // i is comment's index in comments array
                      return (
                        <Review key={i} author={review.author} date={review.date}>{review.stuff}</Review>
                      );
                    })}
                  </ReviewWidget>
                    </div>
                    <div className="panel panel-default panelfill">
                      <div className="panel-heading">
                        <div className="panel-title headertext"><h3>Contact Info </h3></div>
                      </div>
                      <div className="panel-body">
                        <address>
                          {this.state.contact}<br />
                        </address>
                        <hr />
                        <address>
                          <strong>Email</strong><br />
                          <a href="mailto:">{this.state.email}</a>
                        </address>
                      </div>
                    </div>
                  </div>
                </div>

          <script src="js/jquery.min.js"></script>
          <script src="js/bootstrap.min.js"></script>
          </div>

    )
  }
}
