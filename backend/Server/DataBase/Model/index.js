const init = require('../initializeDemo')


const Model = {
  MEDIA: require('./MEDIA'),
  LEVELONE: require('./LEVELONE'),
  LEVELTWO: require('./LEVELTWO'),
  LEVELTHREE: require('./LEVELTHREE'),
  POSITION: require('./POSITION'),
  REPORT: require('./REPORT'),
  TICKET: require('./TICKET'),
  RESPONSE: require('./RESPONSE'),
  USER: require('./USER')
}


module.exports = Model

// init sample data
init(Model);


