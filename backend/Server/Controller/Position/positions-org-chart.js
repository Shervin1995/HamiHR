const orgChart500 = require("./positions-org-chart-500")
const orgChartOne = require("./positions-org-chart-one")
const orgChartTwo = require("./positions-org-chart-two")

// --------------------------------------------
// findPosition
// --------------------------------------------
async function OrgChart(req, res) {
    
    // `final` is list of members accourding to admin level 
    var final = req.list.list;
    var admin = req.list.admin; 
 
    // 500
    if (admin == "500") {
        return res.json(await orgChart500(final))
    } 
     
    // one
    if (admin == "one") {
        return res.json(await orgChartOne(final))
    } 
     
    // two
    if (admin == "two") {
        return res.json(await orgChartTwo(final))
    } 
    
 
}

// 
module.exports = OrgChart