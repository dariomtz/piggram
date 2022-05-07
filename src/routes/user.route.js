const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const moment = require("moment");
const userController = require("../controllers/user.controller");
const { handleErrorAsync } = require("../utils/hof");
const { uploadLocal } = require("../utils/multer");

router.post(
  "/profilePictureLocal",
  uploadLocal.single("profilePicture"),
  (req, res) => {
    console.log(req.file);
    const path = req.file.path.replace("src\\", "");
    console.log(path);
    userController.saveProfilePicture(`http://localhost:3000/${path}`); // Modificar la url
  }
);

router.get("/getProfilePicture", (req, res) => {
  res.send({ url: userController.getProfilePicture() });
});

router.get("/", (req, res) => {
  res.send({ user: userController.list() });
});
router.get("/:id", handleErrorAsync, (req, res) => {
  const { id } = req.params;
  const user = userController.getById(id);
  res.send(user);
});
router.put("/:id", handleErrorAsync, (req, res) => {
  const { id } = req.params;
  const user = userController.update(id, req.body);
  res.send(user);
});
router.delete("/:id", handleErrorAsync, (req, res) => {
  const { id } = req.params;
  userController.delete(id);
  res.status(204).send();
});

module.exports = router;