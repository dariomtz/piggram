const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { uploadLocal, uploadFirebase } = require("../utils/multer");
const { isAuthenticated, isRegistered } = require("../midlewares/auth.midleware");
const {handleErrorAsync} = require("../utils/hof"); 


//path: user/
router.post("/", uploadFirebase.single("file"),handleErrorAsync(async (req, res) => {
  const userInput = req.body;
  user["image"] = req.file.publicUrl;
  const user = await userController.create(user);
  res.status(201).send(user);
}));

//path: user/profilePicture
router.post("/profilePicture",isAuthenticated, uploadFirebase.single("file"),handleErrorAsync(async (req, res) => {
  const { file } = req;
  await userController.saveProfilePicture(req.user._id, file.publicUrl); // Modificar la url
  res.send({ status: 200, url: req.file.publicUrl });
}));

//path: user/search
router.get("/search", isRegistered, handleErrorAsync(async (req, res) => {
  const query = req.query.q;
  // console.log(query);
  if (query == ''){
    res.send([])
    return
  }
  const result = await userController.findUser(query);
  // TODO: move this to usercontroller as search method
  // make sure to return all data that is relevant to search
  res.send(result);
}));

//path: user/
router.get("/",isAuthenticated, handleErrorAsync(async (req, res) => {
  const user = await userController.getById(req.user._id);
  res.send(user);
}));
//path: user/:id
router.get("/:id",isRegistered, handleErrorAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userController.getById(id);
  res.send(user);
}));

//path: user/
router.put("/", isAuthenticated,handleErrorAsync(async (req, res) => {
  const user = await userController.update(req.user._id, req.body);
  res.send(user);
}));

//path: user/
router.delete("/", isRegistered,handleErrorAsync(async (req, res) => {
  await userController.delete(req.user._id);
  res.status(204).send();
}));

module.exports = router;
