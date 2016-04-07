var express = require('express');
var app = express();
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;

function getAllContracts(container){
  var contractData = readDocument('contractContainer', container);
  contractData.forEach((contract) => {
    contract.author = readDocument('users', contract.author);
  });
  return contractData;
}

app.get('/contracts', function(req, res) {
  res.send(getAllContracts(1));
});

app.use(express.static('../client/build'));
app.listen(3000, function() {
  console.log("Freelancer app listening on port 3000!");
});
