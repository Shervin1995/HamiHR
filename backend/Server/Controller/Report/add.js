
const { create} = require("../../DataBase/Function");
const { REPORT} = require("../../DataBase/Model");


// --------------------------------
// level verified
// --------------------------------
async function AddReport(req, res) {

    var 
    output= req.body.output,
    title= req.body.title,
    date= req.body.date

    if (
        output == undefined ||
        title == undefined ||
        date == undefined 
        ) return res.json({message: 'لطفا اطلاعات مورد نیاز را وارد کنید!'})

     

    var message = await create(REPORT, {
        id: await REPORT.max('id', {}) + 1 || 1,
        userID: req.data.id,
        output: output,
        title: title,
        date: date
    });

    
    // if not db created!
    if(typeof(message) !== 'object')
        return res.json({message: 'ثبت نشد متاسفانه!'}); 

    // notify 
    return res.json({message: 'با موفقیت ثبت شد!'})


}

//
module.exports = AddReport