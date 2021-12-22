
 
// findAll
async function findAll(Model, filter, order, attr) {
  
    try {  
      
      var obj = await Model.findAll({
        where: filter, 
        raw: true,
        order: order ? [[order]] : [['id']],
        attributes: attr ? attr : {}
      }); 

    } catch (error) {
      return `Error 500: not find!`
    }

    return obj;

}

//
module.exports = findAll



