var express = require('express');
var app = express();
var database = require('./database');
var readDocument = database.readDocument;
var readDocumentNoId = database.readDocumentNoId;
var writeDocument = database.writeDocument;
var addDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;

function getAllContracts(container){
  var contractData = readDocumentNoId('contractContainer');
  contractData.forEach((contract) => {
    contract.author = readDocument('users', contract.author);
  });
  return contractData;
}

app.get('/contracts', function(req, res) {
  res.send(getAllContracts(1));
});

function contractContains(contract, searchTerm){
  return contract.title.search(searchTerm) > -1 || contract.description.search(searchTerm) > -1 || contract.author.company.search(searchTerm) > -1;
}

app.get('/contracts/:searchTerm', function(req, res) {
  var contractData = getAllContracts(1);
  for(var i = 0, len = contractData.length; i < len; i++){
    contractData[i].author = readDocument('users', contractData[i].author);
    if(!contractContains(contractData[i], searchTerm)){
      contractData.splice(i, 1);
      len--;
      i--;
    }
  }
  res.send(contractData);
});

app.use(express.static('../client/build'));
app.listen(3000, function() {
  console.log("Freelancer app listening on port 3000!");
});
