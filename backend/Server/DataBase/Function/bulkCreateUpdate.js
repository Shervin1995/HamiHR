 
// Model.bulkCreate([{
//   id: 1,
//   title: "kkkk"
// },{
//   id: 2,
//   title: "ererer"
// }], { updateOnDuplicate: ["title"] })


// bulkCreateUpdate
async function bulkCreateUpdate(Model, arr, update) {

    try { 
      await Model.bulkCreate(arr, update); 
    } catch (error) {
      return 'Error 500: not bulkCreateUpdate!'
    }

    return ` 
    -------------------------------------------------
    bulkCreateUpdate Successfully!
    -------------------------------------------------
    `
  
}

//
module.exports = bulkCreateUpdate


