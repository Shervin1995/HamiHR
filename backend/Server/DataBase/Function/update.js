
// Model.update({ 
//   activationStatus: 'active'
// },{
//   where: { id: [1,2,3,4,5,6,7,8,9,10]}
// });


// update
async function update(Model, filter1, filter2) {

    try { 
      await Model.update(filter1, filter2); 
    } catch (error) {
      console.log(error);
      return 'Error 500: not update!'
    }

    return `update Successfully!`

}

//
module.exports = update 