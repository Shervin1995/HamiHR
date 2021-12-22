
const {findOne, findAll} = require("../../DataBase/Function");
const {POSITION, LEVELTWO, LEVELONE} = require("../../DataBase/Model");


// --------------------------------------------
// 
// --------------------------------------------
async function orgChartOne(final) { 
    
    //
    const twos = await findAll(LEVELTWO, {}) 
    const twoAdmins = final.filter(x => x.personalCode.length == 4)
    const threeAdmins = final.filter(x => x.personalCode.length == 6)

    //
    var list1 = twoAdmins.reduce((cur, twoAdmin) => {
        var two = twos.find(x => x.id == twoAdmin.leveltwoID); 
        cur.push({
            personalCode: twoAdmin.personalCode,
            id: twoAdmin.leveloneID,
            name: `${twoAdmin.firstname} ${twoAdmin.lastname}`,
            title: two.title,
            children: threeAdmins.reduce((cur, threeAdmin) => { 
                if (threeAdmin.leveltwoID == twoAdmin.leveltwoID) {
                    cur.push({
                        personalCode: threeAdmin.personalCode,
                        name: `${threeAdmin.firstname} ${threeAdmin.lastname}`,
                        title: "کارشناس"
                    })
                }
                return cur;
            }, []) 
        })
        return cur;
    }, [])


    //
    var item = final.find(x => x.personalCode.length == 2)
    const one = await findOne(LEVELONE, {id: item.leveloneID})

    //
    var list = [{
        personalCode: item.personalCode, 
        name: `${item.firstname} ${item.lastname}`,
        title: one.title,
        children: list1
    }]


    return list
}

//
module.exports = orgChartOne