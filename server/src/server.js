var express = require('express');
var app = express();
var database = require('./database');
var readDocument = database.readDocument;
var readDocumentNoId = database.readDocumentNoId;
var writeDocument = database.writeDocument;
var addDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;

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
  var userData = readDocument('users', user);
  var contractData = userData.contracts;
  contractData.contents = contractData.map(getContractItemSync);
});

app.use(express.static('../client/build'));
app.listen(3000, function() {
  console.log("Freelancer app listening on port 3000!");
});
