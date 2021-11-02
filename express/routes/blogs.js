const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Blog = require("../models/blog");
const ObjectId = require("mongoose").Types.ObjectId;
const { redirectAfterTime } = require("../util/utils");
const blogController = require("../controllers/blogController");


router.get("/", blogController.index);
router.get("/create", blogController.create);
router.get("/:id", blogController.show);
router.get("/:id/edit", blogController.edit);


router.post("/", blogController.store);
router.delete("/:id", blogController.destroy);
router.post("/:id", blogController.update);
module.exports = router;