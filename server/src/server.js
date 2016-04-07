var express = require('express');
var app = express();
var database = require('./database');
var readDocument = database.readDocument;
var readDocumentNoId = database.readDocumentNoId;
var writeDocument = database.writeDocument;
var addDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;

function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID
    return -1;
  }
}

function getAllContracts(){
  var contractData = readDocumentNoId('contractContainer');
  contractData.forEach((contract) => {
    contract.author = readDocument('users', contract.author);
  });
  return contractData;
}

app.get('/contracts', function(req, res) {
  res.send(getAllContracts());
});

function contractContains(contract, searchTerm){
  return contract.title.search(searchTerm) > -1 || contract.description.search(searchTerm) > -1 || contract.author.company.search(searchTerm) > -1;
}

app.get('/contracts/:searchTerm', function(req, res) {
  var contractData = getAllContracts();
  for(var i = 0, len = contractData.length; i < len; i++){
    if(!contractContains(contractData[i], req.params.searchTerm)){
      contractData.splice(i, 1);
      len--;
      i--;
    }
  }
  res.send(contractData);
});

function getContractItemSync(contractItemId) {
  var contractItem = readDocument('contractContainer', contractItemId);
  contractItem.author = readDocument('users', contractItem.author);
  return contractItem;
}

app.get('/contract/user/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber){
    var userData = readDocument('users', useridNumber);
    var contractData = userData.contracts;
    contractData.contents = contractData.map(getContractItemSync);
    res.send(contractData);
  }else {
    res.status(401).end();
  }
});

app.get('/tags', function(req, res){
  res.send(readDocument("tags", 1));
});

function getContractSync(contractId){
  var allContracts = readDocumentNoId('contractContainer');
  var contract = allContracts[contractId - 1];
  return contract;
}

app.get('/user/:userid', function(req, res) {
  var userid = parseInt(req.params.userid);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userid){
    var user = readDocument('users', userid);
    user.contracts = user.contracts.map(getContractSync);
    res.send(user);
  }else{
    res.status(401).end();
  }
});

app.use(express.static('../client/build'));
app.listen(3000, function() {
  console.log("Freelancer app listening on port 3000!");
});
