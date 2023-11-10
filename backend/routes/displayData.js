const express = require("express");
const router = express.Router();
const NodeCache = require("node-cache")

const nodeCache = new NodeCache()

router.post('/foodData',(req,res) => {

    let data;

    if(nodeCache.has("data"))
    {
        data = JSON.parse(nodeCache.get("data"))
    }
    else
    {
        nodeCache.set("data", JSON.stringify([global.food_items,global.food_category]))
    }

    try {

        res.send(data || [global.food_items,global.food_category])
        
    } catch (error) {
        console.log(error)
        res.send("Server Error")
    }
})

module.exports = router
