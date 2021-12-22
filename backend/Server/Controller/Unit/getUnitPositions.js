
const {findOne, findAll} = require("../../DataBase/Function");
const {POSITION, LEVELTWO, LEVELONE} = require("../../DataBase/Model");
const get_500 = require("./get_500");
const get_one = require("./get_one");
const get_two = require("./get_two");

// --------------------------------------------
// unit-positions
// --------------------------------------------
// all possible situations:
//
// (1) 500-500 1*           id == 500 && personalCode == "00"
// (2) 500-one n            id == 500 && personalCode.length == 2
// (3) 500-two n            id == 500 && personalCode.length == 4
//
// (4) one-500 1*           thisPersonalCode.length == 2 && personalCode == "00"
// (5) one-one 1            
// (6) one-two n            
// 
// (7) two-one 1            
// (8) two-two 1            
// 
// (9) three-two 1          
//
// (10) no-position (empty)     personalCode == null || personalCode == undefined
//
// --------------------------------------------
async function getUnitPositions(req, res) {
     
    var id = req.data.id
    var positionID = req.data.positionID
    var personalCode = req.params.personalCode;

    // personal code is not defined
    if (personalCode == undefined || personalCode == null) return res.json({message: "کدپرسنلی را بفرستید!"})        
    
    // (10) no-position
    if (positionID == null) return res.json({message: "نمیتوانید این اطلاعات را دریافت کنید!"})        

    // 500-...
    if (id == 500) {

        // (1) 500-500 1*
        if (personalCode == "00") return res.json(await get_500())
        
        // (2) 500-one n
        if (personalCode.length == 2) return res.json(await get_one(personalCode))
        
        // (3) 500-two n
        if (personalCode.length >= 4 ) return res.json(await get_two(personalCode))
        
    }

    // ----------------------------------------------------------------
    // Admin is in one, two, three but ...
    // ----------------------------------------------------------------
    var position = await findOne(POSITION, {id: positionID});
    var thisPersonalCode = position.personalCode;

    // // get his grand-mother or his mother 
    // if (thisPersonalCode.length > personalCode.length &&
    //     thisPersonalCode.slice(0, personalCode.length) == personalCode
    // ) return res.json(id);      
    
    
    // (4) one-500
    if (personalCode == "00" && thisPersonalCode.length == 2) return res.json(await get_500())

    // his admin (not 500 with "00")
    if (thisPersonalCode.length == personalCode.length + 2 && thisPersonalCode.slice(0, personalCode.length) == personalCode) {
        
        // (7) two-one
        if (personalCode.length == 2) return res.json(await get_one(personalCode))

        // (9) three-two
        if (personalCode.length >= 4) return res.json(await get_two(personalCode))

    }

    // higher level but not his admin
    if (thisPersonalCode.length > personalCode.length) {
        return res.json({message: "نمیتوانید این اطلاعات را دریافت کنید!"})     
    }

    // not himself but same level
    if (thisPersonalCode.length == personalCode.length && thisPersonalCode !== personalCode) {
        return res.json({message: "نمیتوانید این اطلاعات را دریافت کنید!"})        
    }

    // himself (not 500-500)
    if (thisPersonalCode.length == personalCode.length && thisPersonalCode == personalCode) {
        
        // (5) one-one
        if (personalCode.length == 2) return res.json(await get_one(personalCode))

        // (8) two-two
        if (personalCode.length == 4) return res.json(await get_two(personalCode))

    } 

    if (thisPersonalCode.length == 4 && personalCode.length == 6) {
        return res.json(await get_two(personalCode))
    }
     
    // want high level units (except his admin)
    if (thisPersonalCode.length > personalCode.length){
        return res.json({message: "نمیتوانید این اطلاعات را دریافت کنید!"})        
    }

    // (6) one-two 
    if (thisPersonalCode.length == 2 && personalCode.length >= 4){
        return res.json(await get_two(personalCode))
    }
 
    return res.json("not detected!")
}

// 
module.exports = getUnitPositions