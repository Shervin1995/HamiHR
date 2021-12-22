const fs = require("fs");
const path = require("path");
const {bulkCreate} = require("../Function");
const inquirer = require('inquirer')
const sequelize = require('../Connect') 


// -----------------------------------
// importData
// -----------------------------------
function importData(model, modelName) {
  
  //
  let current_directory = path.join(__dirname + '/' + modelName + '.json');
 
  //
  fs.readFile(current_directory, async (err, data) => {
    if (err) console.log(err)

    //
    let data1 = JSON.parse(data.toString());
    let message = await bulkCreate(model, data1)
    console.log(message);

  })
 
}


// initData
async function initData(Model) { 
 
  // 1. user
  try { 
    if (await Model.USER.count() == 0) importData(Model.USER, 'users');
  } catch (error) { 
    console.log('Shervin: USER table not exists', error) 
  } 
 
  // 2. levelone
  try { 
    if (await Model.LEVELONE.count() == 0) importData(Model.LEVELONE, 'levelones');
  } catch (error) { 
    console.log('Shervin: LEVELONES table not exists', error) 
  } 
 
  // 3. leveltwo
  try { 
    if (await Model.LEVELTWO.count() == 0) importData(Model.LEVELTWO, 'leveltwos');
  } catch (error) { 
    console.log('Shervin: LEVELTWOS table not exists', error) 
  }
 
  // 4. levelthree
  try { 
    if (await Model.LEVELTHREE.count() == 0) importData(Model.LEVELTHREE, 'levelthrees');
  } catch (error) { 
    console.log('Shervin: LEVELTHREE table not exists', error) 
  } 
 
  // 5. position
  try { 
    if (await Model.POSITION.count() == 0) importData(Model.POSITION, 'positions');
  } catch (error) { 
    console.log('Shervin: positions table not exists', error) 
  } 

  // 6. report
  try { 
    if (await Model.REPORT.count() == 0) importData(Model.REPORT, 'reports');
  } catch (error) { 
    console.log('Shervin: reports table not exists', error) 
  } 
 
  // 7. ticket
  try { 
    if (await Model.TICKET.count() == 0) importData(Model.TICKET, 'tickets');
  } catch (error) { 
    console.log('Shervin: reports table not exists', error) 
  } 

  // 8. response
  try { 
    if (await Model.RESPONSE.count() == 0) importData(Model.RESPONSE, 'responses');
  } catch (error) { 
    console.log('Shervin: reports table not exists', error) 
  } 

  // 9. medias
  try { 
    if (await Model.MEDIA.count() == 0) importData(Model.MEDIA, 'medias');
  } catch (error) { 
    console.log('Shervin: reports table not exists', error) 
  } 



}
  

// init
async function init(Model) {
 
  // step 1: force tables to drop and create again  

  var questions = [
    {
      type: 'input',
      name: 'name',
      message: `Please type 1 for 'forceDelete' or leave it blank: 
`
    }
  ]

  inquirer.prompt(questions).then(answer => { 
    if(answer['name'] == 1){
      sequelize.sync({ force: true }); 
      console.log('{ force: true } did successfully!');  
    } else { 
      console.log('Nothing Happened! :)');
    }
  });

  sequelize.sync({ force: false , alter : true });
  
  // step 2
  initData(Model) 

}  


//
module.exports = init
 
 