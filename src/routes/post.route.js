const router = require("express").Router();
const PostController = require("../controllers/post.controller");
const { uploadFirebase } = require("../utils/multer");
const {handleErrorAsync} = require("../utils/hof"); 
const {
  isRegistered,
  isAuthorized,
} = require("../midlewares/auth.midleware");
const postController = require("../controllers/post.controller");

router.use(isRegistered);

router.post("/", uploadFirebase.single("image"), handleErrorAsync(async (req, res) => {
  const post = await PostController.createPost({
    image: req.file.publicUrl,
    userId: req.user._id,
    ...req.body,
  });
  res.send(post);
}));

router.get("/", handleErrorAsync(async (req, res) => {
  res.send(await PostController.getFeed());
}));

router.get("/user/:id", handleErrorAsync(async (req, res) => {
  res.send(await postController.getPostsByUser(req.params.id));
}));

router.get("/:id", handleErrorAsync(async (req, res) => {
  const post = await PostController.getPost(req.params.id);
  res.send(post);
}));

router.put("/:id", isAuthorized, handleErrorAsync( async (req, res) => {
  const post = await PostController.editPost(req.params.id, req.body);
  res.send(post);
}));

router.delete("/:id", isAuthorized, handleErrorAsync(async (req, res) => {
  await PostController.deletePost(req.params.id);
  res.status(204).send();
}));

module.exports = router;
