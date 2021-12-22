 


// find
async function findOne(Model, filter, order, attr) {

    //
    try { 
      var obj = await Model.findOne({
        where: filter,
        raw: true,
        order: order ? [[order]] : [['id']],
        attributes: attr ? attr : {}
      });
    } catch (error) {
      console.log(error);
      return `Error 500: not findOne!`
    }
    
    //
    return obj;
  
}


module.exports = findOne

 
 