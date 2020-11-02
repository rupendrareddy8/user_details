const collection = require('./model.js')


//function to get single user
function getUser(query) {
  return new Promise(function(resolve, reject) {
    collection.findOne(query, function(err, response) {
      if(err) return reject({message: "Something went wrong"})
      if(!response) return reject({message: "No data found"})
      return resolve(response)
    })
  })
}


module.exports = {
  getUser
}