
const {findOne, findAll} = require("../../DataBase/Function");
const {POSITION, LEVELTWO, LEVELONE} = require("../../DataBase/Model");



async function orgChart500(final) { 
    
    //
    const ones = await findAll(LEVELONE, {})
    const twos = await findAll(LEVELTWO, {})
    const oneAdmins = final.filter(x => x.personalCode.length == 2)
    const twoAdmins = final.filter(x => x.personalCode.length == 4)
    const threeAdmins = final.filter(x => x.personalCode.length == 6)

    //
    var list2 = twoAdmins.reduce((cur, twoAdmin) => {
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
    var list1 = oneAdmins.reduce((cur, item) => {
        var one = ones.find(x => x.id == item.leveloneID) 
        cur.push({ 
            personalCode: item.personalCode,
            name: `${item.firstname} ${item.lastname}`,
            title: one.title,
            children: list2.filter(x => x.id == item.leveloneID) 
        })
        return cur
    }, [])

    var item = final.find(x => x.userID == 500)
    //
    var list = [{
        personalCode: "00",
        name: `${item.firstname} ${item.lastname}`,
        title: "شرکت حامیکت",
        children: list1
    }]


    return list
}

//
module.exports = orgChart500