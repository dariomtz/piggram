const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { uploadLocal, uploadFirebase } = require("../utils/multer");
const { isAuthenticated } = require("../midlewares/auth.midleware");

router.use(isAuthenticated);

//path: user/

router.post(
  "/profilePictureLocal",
  uploadLocal.single("file"),
  (req, res) => {
    console.log(req.file);
    const path = req.file.path.replace("src\\", "");
    console.log(path);
    userController.saveProfilePicture(req.user._id,`http://localhost:3000/${path}`); // Modificar la url
    res.send({status:200,url: `http://localhost:3000/${path}`})
  }
);

router.post(
  "/profilePicture",
  uploadFirebase.single("file"),
  (req, res) => {
    const {file} = req;
    userController.saveProfilePicture(req.user._id,file.publicUrl); // Modificar la url
    res.send({status:200,url: req.file.publicUrl})
  }
);

router.get('/:username',isAuthenticated, async(req, res) => {
  const { username } = req.params;
  console.log(username);
  const user = await userController.findUserByUsername(username);
  const user2 = await userController.findUserByName(username);
  const set = new Set(user.username);
  user2.forEach(element => set.add(element));

  const result = Array.from(set)
  res.send(result);
});
  
router.get("/:id/getProfilePicture", isAuthenticated,async (req, res) => {
  const { id } = req.params;
  res.send({ url: await userController.getProfilePicture(id) });
});

router.get("/", async(req, res) => {
  res.send({ user: await userController.list() });
});

router.get("/id/:id", isAuthenticated,async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await userController.getById(id);
  res.send(user);
});

router.put("/id/:id", isAuthenticated, async(req, res) => {
  const { id } = req.params;
  const user = await userController.update(id, req.body);
  res.send(user);
});

router.delete("/id/:id", isAuthenticated,async (req, res) => {
  const { id } = req.params;
  await userController.delete(id);
  res.status(204).send();
});

module.exports = router;
