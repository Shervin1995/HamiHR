
const { findOne} = require("../../DataBase/Function");
const { REPORT} = require("../../DataBase/Model");


// --------------------------------
// level verified
// --------------------------------
async function getReport(req, res) {

    const id = req.params.reportID
    if (id == undefined) return res.json({message: "لطفا reportID را تعریف کنید!"}) 
        
    
    var report = await findOne(REPORT, {
        id: id,
        // userID: req.data.id
    });
    
    if (report) {
        return res.json({
            report: report, 
            isHimself: report.userID == req.data.id ? true : false
        }) 
    } else {
        return res.json({message: "گزارش وجود ندارد"})  
    }

}

//
module.exports = getReport