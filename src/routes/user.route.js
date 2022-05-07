const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { uploadLocal } = require("../utils/multer");
const { isAuthenticated } = require("../midlewares/auth.midleware");

router.use(isAuthenticated);

router.post(
  "/:id/profilePictureLocal",
  uploadLocal.single("profilePicture"),
  (req, res) => {
    const { id } = req.params;
    console.log(req.file);
    const path = req.file.path.replace("src\\", "");
    console.log(path);
    userController.saveProfilePicture(`${id},http://localhost:3000/${path}`); // Modificar la url
  }
);

router.get("/:id/getProfilePicture", isAuthenticated, (req, res) => {
  const { id } = req.params;
  res.send({ url: userController.getProfilePicture(id) });
});

router.get("/", (req, res) => {
  res.send({ user: userController.list() });
});
router.get("/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const user = userController.getById(id);
  res.send(user);
});
router.put("/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const user = userController.update(id, req.body);
  res.send(user);
});
router.delete("/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  userController.delete(id);
  res.status(204).send();
});

module.exports = router;
