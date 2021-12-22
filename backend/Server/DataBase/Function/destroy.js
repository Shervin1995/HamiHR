 

// {where: {id: [1,2,3]}}

// destroy
async function destroy(Model, filter) {

    try { 
      await Model.destroy({where: filter}); 
    } catch (error) {
      console.log(error);
      return 'Error 500: not destroyed!'
    }

    return `destroy Successfully!`
  
}

//
module.exports = destroy