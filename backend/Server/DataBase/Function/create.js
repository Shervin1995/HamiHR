 



// create
async function create(Model, obj) {

    try {
      var obj = await Model.create(obj); 
    } catch (error) {
      console.log(error);
      return 'Error 500: not Create!'
    }

    return obj
  
}

//
module.exports = create


