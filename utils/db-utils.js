const mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = function connectDataBase (uri) {
  return new Promise((resolve, reject) => {
    mongoose.connection
    .on('error', error => console.error)
    .on('close', () => console.log('Database connection close.'))

    mongoose.connect(uri, {
      useMongoClient: true
    }).then(
      () => { console.log('Database connected!') },
      err => { console.error(err) }
    )  
  })
}