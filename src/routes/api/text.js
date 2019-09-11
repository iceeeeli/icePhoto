const express =require("express");
const router =express.Router();

router.get("/text",(req,res) => {
    res.json({msg:"work!"})
})

module.exports=router;