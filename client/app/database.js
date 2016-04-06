import React from 'react';

// Modify with your startup's name!
var startupName = "Bytewave";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users": {
      // This user has id "1".
      "1": {
        "_id": 1,
        "company": "UCombinator",
        "fullName": "Chandler",
        "title": "Contractor",
        "type": "Contractor",
        "contracts": [1, 2],
        "skills": "Html, Java, Javascript, Knitting",
        "experience":"4 Years of Computer Science at UMass Amherst, 2 Years at bytewave developing web applications",
        "about": "Hello. I am an extremely interesting person.",
        "email": "xxxx@gmail.com",
        "contact": "UCombinator\n99 Java Lane\nAmherst, MA 01002\n(413) 123-4567",
        "rating": "4",
        "reviews": []
      },

      "2": {
        "_id": 2,
        "company": "Student",
        "fullName": "Jack",
        "title": "Developer",
        "type": "Developer",
        "contracts": [],
        "skills": "Java, Scala",
        "experience":"3 Years of fixing computer hardware",
        "about": "Hello. I am an extremely interesting person.",
        "email": "yyyy@gmail.com",
        "contact": "Jack\nBee St.\nDaisy, MA 012345\n(413) 143-4567",
        "rating": "3",
        "reviews": [
          {
            "author": 1,
            "stuff": "[place review here]",
            "date": 1453668480000
          },
          {
            "author": 3,
            "stuff": "[place review here again]",
            "date": 1453668500000
          }
        ]
      },

      "3": {
        "_id": 3,
        "company": "Student",
        "fullName": "Michelle Wilkinson",
        "title": "Developer",
        "type": "Both",
        "contracts": [],
        "skills": "Ruby, Scala, Javascript",
        "experience":"4 Years of Computer Science at UMass Amherst",
        "about": "Hello. I am an extremely interesting person.",
        "email": "bbbbb@gmail.com",
        "contact": "Michelle W.\n65 Watermelon Rd.\nAmherst, MA 01002\n(413) 547-5519",
        "rating": "4",
        "reviews": []
      }
  },
	"contractContainer": {
		"1": [
      {
        "_id": 1,
        "author": 1,
        "title": "Dynamic Mockup",
        "startend": "Started",
        "budget": "$0.00",
        "deadline": 14513451345,
        "description": "This is the description I am using to show contract item description",
        "postdate": "02/03/0344",
        "skills": ["HTML", "CSS", "JavaScript"],
        "tags": ["#html", "#css"]
      },
      {
        "_id": 2,
        "author": 1,
        "title": "Static UI Mockup",
        "startend": "Finished",
        "budget": "$0.00",
        "deadline": "02/09/2016",
        "postdate": "03/58/2015",
        "description": "Using HTML, CSS, and Bootstrap, create a non-interactive mockup of your product with all screens you could possibly access from the URL. You will not have to create any Log In/Out pages at this point in the project, but a user should be logged into your service for these screen captures.",
        "skills": ["HTML", "CSS", "JavaScript"],
        "tags": ["#html", "#css", "#javascript", "#bootstrap", "#web"]
      }
    ]
  }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }

  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}
