var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var reult;
var bodyParser = require('body-parser');
let express = require('express');
let app = express();
app.use(bodyParser.json()); 
app.listen(3000, () => console.log('Server running on port 3000!'))
app.post('/api/cources', (req, res) => {
    console.log(req.body)
   
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  
  var dbo = db.db("mydb");
  reult= { name: req.body.name, address: req.body.address };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) 
//     {throw err;}
//     else{
//     console.log("1 document inserted")
//   reult=res
//     }
//     db.close();
//   });
   
});
res.status(200).send(reult)
console.log(reult)

});
 
const arry=[{id:"name"}]

app.get('/api/cources', (req, res) => {
   res.send(arry)
})