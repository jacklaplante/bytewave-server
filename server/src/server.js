var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database = require('./database');
var readDocument = database.readDocument;
var readDocumentNoId = database.readDocumentNoId;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var deleteDocument = database.deleteDocument;

app.use(bodyParser.text());
app.use(bodyParser.json());

function getUserIdFromToken(authorizationLine) {
  try {
    var token = authorizationLine.slice(7);
    var regularString = new Buffer(token, 'base64').toString('utf8');
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    if (typeof id === 'number') {
      return id;
    } else {
      return -1;
    }
  } catch (e) {bje
    return -1;
  }
}

function getAllContracts(){
  var allContracts = readDocumentNoId('contracts');
  var contractData = [];
  for(var key in allContracts){
    contractData.push(allContracts[key]);
  }
  contractData.forEach((contract) => {
    contract.author = readDocument('users', contract.author);
  });
  return contractData;
}

function saveContract(body){
  var newContract = {
    "title": body.title,
    "budget": body.budget,
    "deadline": body.deadline,
    "description": body.description,
    "skills": body.skills,
    "tags": body.tags
  }

  newContract = addDocument('contracts', newContract);

  return newContract;
}

function postReview(userId, body) {
  var user = readDocument('users', userId);
  user.reviews.push({
    "author": body.author,
    "stuff": contents.contents,
    "date": new Date().getTime()
  });
  var updatedUser = writeDocument('users', user);
  return updatedUser;
}


app.get('/user/:userId', function(req, res) {
  var useridNumber = parseInt(userid, 10);
  res.send(getUser(userId));
});


app.get('/user/:userid/privateprofile', function(req, res) {
  var userid = parseInt(req.params.userid);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userid){
    var userid = req.params.userid;
    res.send(getUser(userid));
  }else{
    res.status(401).end();
  }
});


app.put('/user/:userId/publicprofile', function(req, res) {
  var userId = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var profileId = parseInt(userid, 10);
  var user = readDocument('users', userid);
  if (fromUser === user) {
    res.send(postReview(profileId, req.body));
  } else {
    res.status(401).end();
  }
});

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
  var allContracts = readDocumentNoId('contracts');
  var contract = allContracts[contractId];
  return contract;
}
function getUser(id){
  var users = readDocument('users', id);
  users.contracts = users.contracts.map(getContractSync);
  return users;
 }

app.get('/user/:userid/privateprofile', function(req, res) {
  var userid = parseInt(req.params.userid);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userid){
    var userid = req.params.userid;
    res.send(getUser(userid));
  }else{
    res.status(401).end();
  }
});

function updateUser(id, newUser){
  var user = readDocument('users', id);
  user.skills = newUser.skills;
  user.experience = newUser.experience;
  user.about = newUser.about;
  user.contact = newUser.contact;
  user.email= newUser.email;
  var updatedUser = writeDocument('users', user);
  return updatedUser;
}
// edit profile.
app.put('/user/:userid/privateprofile/edit', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var useridNumber = parseInt(userid, 10);
  var user = readDocument('users', userid);
  if (fromUser === useridNumber) {
    res.send(updateUser(userid, req.body));
  } else {
    res.status(401).end();
  }
});

app.post('/contract', function(req, res) {
  var body = req.body;
  var newContract = saveContract(body);
  res.status(201);
  res.send(newContract);
});

app.use(express.static('../client/build'));
app.listen(3000, function() {
  console.log("Freelancer app listening on port 3000!");
});
