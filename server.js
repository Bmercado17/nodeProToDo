//CRUD    create, read, update, delete
// using node.js express and axios also json to send a synchronist request

let express = require("express");
let mongodb = require("mongodb");
let app = express();
let db;
app.use(express.static("public"));
let connectionString =
  "mongodb+srv://askotala:Elmesia17@cluster0.0xkzj.mongodb.net/TodoApp?retryWrites=true&w=majority";
mongodb.connect(
  connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, client) {
    db = client.db();
    app.listen(3000);
  }
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
); //boiler plate code to be able to get express to work

app.get("/", function (req, res) {
  db.collection("items")
    .find()
    .toArray(function (err, items) {
      res.send(`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple To-Do App</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="display-4 text-center py-1">To-Do App!</h1>
      
      <div class="jumbotron p-3 shadow-sm">
        <form id="create-form" action="/create-item" method="POST">
          <div class="d-flex align-items-center">
            <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-primary">Add New Item</button>
          </div>
        </form>
      </div>
      
      <ul id="item-list" class="list-group pb-5">
        
      </ul>
      
    </div>
    <script>
    let items = ${JSON.stringify(items)}
    </script>
          <script src="https://unpkg.com/axios/dist/axios.min.js"> </script> 
          <script src="/browser.js"></script>
  </body>
  </html>`);
    });
});
// this below code that creates and redirects after creating an item
app.post("/create-item", function (req, res) {
  db.collection("items").insertOne({
      //this chunk of code updates the task/item on the frnt and in dbmongo
      text: req.body.text,
    },
    function (err, info) {
      // when referencing the attributes or elements name double check how is actually written
      res.json(info.ops[0]); //this will sendback dta on the fly without a hard rendering a hrd reload on the page
    }
  );
});

// this below code that modifies or updates an item

app.post("/update-item", function (req, res) {
  //with this code we tell the server which document we wnt 2 updt
  db.collection("items").findOneAndUpdate({
      _id: new mongodb.ObjectId(req.body.id),
    }, {
      $set: {
        text: req.body.text,
      },
    },
    function () {
      res.send("success");
    }
  );
});
//this chunk of code will delete an item on the frontend and back
app.post("/delete-item", function (req, res) {
  db.collection("items").deleteOne({
      _id: new mongodb.ObjectId(req.body.id),
    },
    function () {
      res.send("success");
    }
  );
});