import {readDocument, writeDocument, addDocument} from './database.js';

export function getAllContracts(container, cb) {
  var contractData = readDocument('contractContainer', container);
  contractData.forEach((contract) => {
    contract.author = readDocument('users', contract.author);
  });
  emulateServerReturn(contractData, cb);
}

function getContractItemSync(contractItemId) {
  var contractItem = readDocument('contractContainer', contractItemId);
  contractItem.author = readDocument('users', contractItem.author);
  return contractItem;
}

export function getContractData(user, cb) {
  var userData = readDocument('users', user);
  var contractData = userData.contracts;
  contractData.contents = contractData.map(getContractItemSync);
  emulateServerReturn(contractData, cb);
}

function contractContains(contract, searchTerm){
  return contract.title.search(searchTerm) > -1 || contract.description.search(searchTerm) > -1 || contract.author.company.search(searchTerm) > -1;
}

export function getSearchContracts(searchTerm, container, cb) {
  var contractData = readDocument('contractContainer', container);
  for(var i = 0, len = contractData.length; i < len; i++){
    contractData[i].author = readDocument('users', contractData[i].author);
    if(!contractContains(contractData[i], searchTerm)){
      contractData.splice(i, 1);
      len--;
      i--;
    }
  }
  emulateServerReturn(contractData, cb);
}

export function getTags(cb){
  var tags = readDocument("tags", 1);
  emulateServerReturn(tags, cb);
}

export function getContractSync(contractId){
  var allContracts = readDocument('contractContainer', 1);
  var contract = allContracts[contractId - 1];
  return contract;
}

export function getUser(id, cb){
  var users = readDocument('users', id);
  users.contracts = users.contracts.map(getContractSync);
  emulateServerReturn(users, cb);
}

export function updateUser(id, newUser, cb){
  var user = readDocument('users', id);
  user.skills = newUser.skills;
  user.experience = newUser.experience;
  user.about = newUser.about;
  user.contact = newUser.contact;
  user.email= newUser.email;
  var updatedUser = writeDocument('users', user);
  emulateServerReturn(updatedUser, cb);
}

export function postReview(userId, author, contents, cb) {
  // Since a CommentThread is embedded in a FeedItem object,
  // we don't have to resolve it. Read the document,
  // update the embedded object, and then update the
  // document in the database.
  var user = readDocument('users', userId);
  user.reviews.push({
    "author": author,
    "stuff": contents,
    "date": new Date().getTime()
  });
  var updatedUser = writeDocument('users', user);
  // Return a resolved version of the feed item so React can
  // render it.
  emulateServerReturn(updatedUser, cb);
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
