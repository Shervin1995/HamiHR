
const {update, findOne} = require("../../DataBase/Function");
const {REPORT} = require("../../DataBase/Model");


// --------------------------------
// level verified
// --------------------------------
async function UpdateReport(req, res) {

    var 
    output= req.body.output,
    title= req.body.title,
    date= req.body.date,
    id= req.body.reportID,
    userid = req.data.id
    
    var report = await findOne(REPORT, {id})

    if (report.userID !== userid) {
        return res.json({message: "شما حق ویرایش گزارش خود را دارید!"})
    }

    if (output == undefined ||
        id == undefined ||
        title == undefined ||
        date == undefined
        ) return res.json({message: 'لطفا اطلاعات مورد نیاز را وارد کنید!'})

     

    await update(REPORT, {
        output, title, date
    },{
        where: {id}
    });

    // notify 
    return res.json({message: "به روز شد!"})


}

//
module.exports = UpdateReport