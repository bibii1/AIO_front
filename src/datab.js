/* eslint-disable no-console */
//require('./User.js'); j'arrive pas a faire  qu'on profite de la classe user du fichier user.js
var MongoClient = require('mongodb').MongoClient;
var forge = require('node-forge');

var url = "mongodb://localhost:32768/id_aio";
const client = new MongoClient(url, { useNewUrlParser: true });
var userCollection = null;


function requestToMongoDb(functionToMongoDb){
    client.connect(err => {
        userCollection=client.db("login").collection("User")
        try {
            userCollection.functionToMongoDb()
         } catch (err) {}
        client.close();
      });
}

  function createUser(name,firstName,email,password){
      var pwdEncoded = forge.util.encodeUtf8(password); //first type of encryption, in the future it will be good to have a better key
      var userCreated = new User(name,firstName,email,pwdEncoded);

      requestToMongoDb(userCollection.insertOne({UserName : userCreated.UserName, Password : userCreated.pwdEncoded}));
    }

  function login(name,password){
      var pwdEncoded=forge.util.encodeUtf8(password);
      
      requestToMongoDb();
  }

  export{login};
  export{createUser};
  
  class User
{
    constructor(lastName,firstName,email,adress,password)
    {
        this.lastName = lastName;
        this.firstName=firstName;
        this.email = email;
        this.adress = adress;
        this.password=password;
    }
    getLastName()
    {
        return `${this.lastName}`;
    }
    getFirstName(){
        return `${this.firstName}`;
    }
    getEmail()
    {
        return `${this.email}`;
    }
    getadress()
    {
        return `${this.adress}`;
    }
}