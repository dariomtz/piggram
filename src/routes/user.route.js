const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { uploadLocal, uploadFirebase } = require("../utils/multer");
const { isAuthenticated } = require("../midlewares/auth.midleware");
const {handleErrorAsync} = require("../utils/hof"); 

router.use(isAuthenticated);

//path: user/
router.post("/", uploadFirebase.single("file"),handleErrorAsync(async (req, res) => {
  const userInput = req.body;
  user["image"] = req.file.publicUrl;
  const user = await userController.create(user);
  res.status(201).send(user);
}));

//path: user/ 
router.post("/profilePicture", uploadFirebase.single("file"),handleErrorAsync(async (req, res) => {
  const { file } = req;
  await userController.saveProfilePicture(req.user._id, file.publicUrl); // Modificar la url
  res.send({ status: 200, url: req.file.publicUrl });
}));

router.get("/search", isAuthenticated,handleErrorAsync(async (req, res) => {
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

router.get("/",handleErrorAsync(async (req, res) => {
  const user = await userController.getById(req.user._id);
  res.send(user);
}));

router.get("/:id",handleErrorAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userController.getById(id);
  res.send(user);
}));

router.put("/", isAuthenticated,handleErrorAsync(async (req, res) => {
  const user = await userController.update(req.user._id, req.body);
  res.send(user);
}));

router.delete("/", isAuthenticated,handleErrorAsync(async (req, res) => {
  await userController.delete(req.user._id);
  res.status(204).send();
}));

module.exports = router;
