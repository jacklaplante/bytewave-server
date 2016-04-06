import {readDocument, writeDocument, addDocument} from './database.js';

export function getAllContracts(container, cb) {
  var contractData = readDocument('contractContainer', container);
  contractData.forEach((contract) => {
    contract.author = readDocument('users', contract.author);
  });
  emulateServerReturn(contractData, cb);
}

function contractContains(contract, term){
  return contract.title.search(term) > -1 || contract.description.search(term > -1) ||
    contract.author.company.search(term) > -1;
}

export function getSearchContracts(searchTerm, container, cb) {
  var contractData = readDocument('contractContainer', container);
  for(var i = 0, len = contractData.length; i < len; i++){
    contractData[i].author = readDocument('users', contractData[i].author);
    if(!contractContains(contractData[i]), searchTerm){
      contractData.splice(i, 1);
      len--;
      i--;
    }
  }
  emulateServerReturn(contractData, cb);
}

export function getUser(id, cb){
  var user = readDocument('users', id);
  emulateServerReturn(user, cb);
}

export function updateUser(id, newUser, cb){
  var user = getUser(id, user);
  user.contents = newUser;
  writeDocument('users', user);
  emulateServerReturn(user, cb);
}


function getReviewsSync(reviewId) {
  var review = readDocument('reviews', reviewId);
  // Assuming a StatusUpdate. If we had other types of FeedItems in the DB, we would
  // need to check the type and have logic for each type.
  review.author = readDocument('users', review.author);
  // Resolve comment author.
  return review;
}

export function postReview(reviewId, author, contents, cb) {
  // Since a CommentThread is embedded in a FeedItem object,
  // we don't have to resolve it. Read the document,
  // update the embedded object, and then update the
  // document in the database.
  var reviews = readDocument('reviews', reviewId);
  reviews.push({
    "author": author,
    "contents": contents,
    "postDate": new Date().getTime()
  });
  writeDocument('users', reviews);
  // Return a resolved version of the feed item so React can
  // render it.
  emulateServerReturn(getReviewsSync(reviewId), cb);
}
/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function saveContract(contents, callback){

  var contractData = {
    "title": contents.state.title,
    "budget": contents.state.budget,
    "deadline": contents.state.deadline,
    "description": contents.state.description,
    "skills": contents.state.skills,
    "tags": contents.state.tags
  }

  var newContract = addDocument('contracts', contractData);

  emulateServerReturn(newContract, callback);
}
