const router = require("express").Router();
const PostController = require("../controllers/post.controller");
const { uploadFirebase } = require("../utils/multer");
const {
  isAuthenticated,
  isAuthorized,
} = require("../midlewares/auth.midleware");
const postController = require("../controllers/post.controller");

router.use(isAuthenticated);

router.post("/", uploadFirebase.single("image"), async (req, res) => {
  const postInput = req.body;
  post[image] = req.file.path;
  const post = await PostController.createPost(req.body);
  res.send(post);
});

router.get("/", async (req, res) => {
  res.send(await PostController.getFeed());
});

router.get("/user/:id", async (req, res) => {
  res.send(await postController.getPostsByUser(req.params.id));
});

router.get("/:id", async (req, res) => {
  const post = await PostController.getPost(req.params.id);
  res.send(post);
});

router.put("/:id", isAuthorized, async (req, res) => {
  const post = await PostController.editPost(req.params.id, req.body);
  res.send(post);
});

router.delete("/:id", isAuthorized, async (req, res) => {
  await PostController.deletePost(req.params.id);
  res.status(204).send();
});

module.exports = router;
