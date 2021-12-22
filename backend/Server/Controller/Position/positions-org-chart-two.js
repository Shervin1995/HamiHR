
const {findOne, findAll} = require("../../DataBase/Function");
const {POSITION, LEVELTWO, LEVELONE} = require("../../DataBase/Model");



async function orgChartTwo(final) { 
    
    //  
    const threeAdmins = final.filter(x => x.personalCode.length == 6)

    //
    var list1 = threeAdmins.reduce((cur, twoAdmin) => { 
        cur.push({
            personalCode: twoAdmin.personalCode,
            id: twoAdmin.leveloneID,
            name: `${twoAdmin.firstname} ${twoAdmin.lastname}`,
            title: "کارشناس"
        })
        return cur;
    }, [])


    //
    var item = final.find(x => x.personalCode.length == 4)
    const two = await findOne(LEVELTWO, {id: item.leveltwoID})

    //
    var list = [{
        personalCode: item.personalCode, 
        name: `${item.firstname} ${item.lastname}`,
        title: two.title,
        children: list1
    }]

    //
    return list
}

//
module.exports = orgChartTwo