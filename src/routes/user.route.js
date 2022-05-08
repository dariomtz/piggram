const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { uploadLocal, uploadFirebase } = require("../utils/multer");
const { isAuthenticated } = require("../midlewares/auth.midleware");

router.use(isAuthenticated);

//path: user/
router.post("/", uploadFirebase.single("file"), async (req, res) => {
  const userInput = req.body;
  user["image"] = req.file.path;
  const user = await userController.create(user);
  res.status(201).send(user);
});

router.get("/search", isAuthenticated, async (req, res) => {
  const query = req.query.q;
  const user = await userController.findUserByUsername(query);
  const user2 = await userController.findUserByName(query);
  const set = new Set(user.map(u => u.username));
  user2.forEach(u => set.add(u.username));
  // TODO: move this to usercontroller as search method
  // make sure to return all data that is relevant to search
  const result = Array.from(set);
  res.send(result);
});

router.get("/", async (req, res) => {
  const user = await userController.getById(req.user._id);
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userController.getById(id);
  res.send(user);
});

router.put("/", isAuthenticated, async (req, res) => {
  const user = await userController.update(req.user._id, req.body);
  res.send(user);
});

router.delete("/", isAuthenticated, async (req, res) => {
  await userController.delete(req.user._id);
  res.status(204).send();
});

module.exports = router;
