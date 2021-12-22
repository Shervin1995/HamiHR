 


// insertMany
async function bulkCreate(Model, arr) {

    try { 
      await Model.bulkCreate(arr); 
    } catch (error) {
      console.log(error);
      return 'Error 500: not bulkCreate!'
    }

    return ` 
    -------------------------------------------------
    bulkCreate Successfully!
    -------------------------------------------------`
  
  }

  
  module.exports = bulkCreate


