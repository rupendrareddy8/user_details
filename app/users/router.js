const config = require('../config/routes.js');
const collection = require('./model.js')
const router = config.express.Router();
const functions = require('./functions.js')


//Api to create a new user
router.post('/create-new-user', function(req, res) {
  let dataObj = {
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    address: {
      street: req.body.street,
      locality: req.body.locality,
      city: req.body.locality,
      state: req.body.state,
      pincode: req.body.pincode,
      location: { type: "String", coordinates: [ req.body.longitude, req.body.latitude ] }
    }
  }

  //Creating user in DB
  collection.create(dataObj, function(err, response) {
    if(err) return res.status(400).send({message: "Something went wrong while creating a user. Please try again later"}) //Error occured while creating User
    if(response) return res.status(201).send({message: "User created successfully"})  //User created successfully
  })
})



//Api to get all registered users data
router.get('/all-users', function(req, res) {
  // Create Options
  let options = { sort: '-createdAt' };
  options.page = (req.query.page)? Number(req.query.page): 1;
  options.limit = (req.query.limit)? Number(req.query.limit): 20;
  options.lean = true

  //Create Query

  let query = {}

  //Query to get user's data
  collection.paginate(query, options, function(err, response) {
    if(err) return res.status(400).send({message: "Something went wrong"})
    if(!response.docs.length) return res.status(400).send({message: "No data Found"})
    return res.status(200).send(response)
  })
})


//API to update existing user
router.put('/update-user/:id', async function(req, res) {

  try {

    //pre validation cehck
    if(!req.params.id) return res.status(400).send({message: "Please provide User name and Mobile number"})

    //create query to update
    let query = {
      "_id": req.params.id
    }

    //checking if user existed or not
    let user = await functions.getUser(query)

    //create update data

    let updateData = {$set: {}}

    if(req.body.name) updateData["$set"]["name"] = req.body.name

    if(req.body.mobile) updateData["$set"]["mobile"] = req.body.mobile

    if(req.body.email) updateData["$set"]["email"] = req.body.email

    if(req.body.street) updateData["$set"]["address.street"] = req.body.street

    if(req.body.locality) updateData["$set"]["address.locality"] = req.body.locality

    if(req.body.city) updateData["$set"]["address.city"] = req.body.city

    if(req.body.state) updateData["$set"]["address.state"] = req.body.state

    if(req.body.pincode) updateData["$set"]["address.pincode"] = req.body.pincode

    //Updating the user data
    collection.findOneAndUpdate(query, updateData, {new: true}, function(err, response) {
      if(err) return res.status(400).send({message: "Something went wrong"})
      return res.status(200).send({message: "User data updated successfully"})
    })
  } catch(e) {
    return res.status(400).send(e)
  }
})


//Api to delte a user
//Pass mongo id as params to delete the user
router.delete('/delete-user/:id', async function(req, res) {
  try {

    //pre validation cehck
    if(!req.params.id) return res.status(400).send({message: "Please provide User name and Mobile number"})

    //creating query
    let query = {
      "_id": req.params.id
    }

    //checking if user existed or not
    let user = await functions.getUser(query)

    //deleting record from DB
    collection.deleteOne(query, function(err, response) {
      if(err) return res.status(400).send({message: "Something went wrong"})  //Error occured while deleting user
      return res.status(200).send({message: "User deleted successfully"})  //User deleted successfully
    })
  } catch(e) {
    return res.status(400).send(e)
  }
 })



module.exports = router



