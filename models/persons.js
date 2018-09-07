const mongoose = require('mongoose')

require('dotenv').config()
/*
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
*/  
const url = process.env.MONGODB_URI

mongoose.connect(url)

const Persons = mongoose.model('persons', {
    name: String,
    number: String
})

module.exports = Persons;