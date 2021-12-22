const express = require('express');
const app = express();  
var cors = require('cors')

//  
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '50mb'}));
 

// ------------
// routes
// ------------
app.use(function(req, res, next) { 
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      ); 
    next();  
  });

// restrict routes
app.use(  
  cors({ 
    origin: [
        "https://juniortargets-panel.herokuapp.com",
        "http://localhost:3000",
        "https://juniorfrontend.ir"
    ]
  })
);

app.use(require('./Routes'));
 

// 
app.listen(process.env.PORT || 8080, () => {
    console.log('Express listening to http://localhost:8080')
});
