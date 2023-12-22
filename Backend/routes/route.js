const express = require("express");
const router = express.Router();

const {register,login} = require("../functions/auth_routes");
const {getProfile,makeProfile, findProfile, sendConnectionRequest, acceptConnectionRequest, isConnected, getRecentConnections, getAcceptedConnections}=require("../functions/profile_routes");
const {getCompany,createCompany}=require("../functions/company_routes");
const { createStory, getStory } = require("../functions/stories_routes");

router.post("/auth/register",register);
router.post("/auth/login",login);

router.post("/getProfile", getProfile);
router.post("/makeProfile",makeProfile);
router.post("/findProfile",findProfile);
router.post("/sendConnectionRequest",sendConnectionRequest);
router.post("/acceptConnectionRequest",acceptConnectionRequest);
router.post("/isConnected",isConnected);
router.post("/getRecentConnections", getRecentConnections);
router.post("/getAccepted", getAcceptedConnections);


router.post("/getCompany",getCompany);
router.post("/createCompany",createCompany);


router.post("/createStory", createStory);
router.get("/getStory", getStory)

module.exports = router;