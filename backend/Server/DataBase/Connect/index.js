const Sequelize = require('sequelize'); 
 
var db = "db1"
var user = "user1"
var pass = "User1"

// 'postgres://user:pass@localhost:5432/db'
const url = `postgres://${user}:${pass}@localhost:5432/${db}`;
// const url = "postgres://zhrcabranmwpvw:e40c33c4778706ee2b52e6d280e0b342174f2217cef89b5bf0eedef5f809796c@ec2-54-204-148-110.compute-1.amazonaws.com:5432/d3o6jd103qlmuj"; 
const sequelize = new Sequelize(url, {logging: false});

//
sequelize.authenticate()
    .then(() => console.log('postgres connected success!'))
    .catch((e) => console.error('postgres connection Failed!', e));

//
module.exports = sequelize