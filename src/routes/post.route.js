const router = require("express").Router();
const PostController = require("../controllers/post.controller");
const { uploadFirebase } = require("../utils/multer");
const { isAuthenticated } = require("../midlewares/auth.midleware");

router.use(isAuthenticated);

router.post("/", uploadFirebase.single("image"), async (req, res) => {
  const postInput = req.body;
  post[image] = req.file.path;
  const post = await PostController.createPost(req.body);
  res.send(post);
});

router.get("/:id", async (req, res) => {
  const post = await PostController.getPost(req.params.id);
  res.send(post);
});

router.put("/:id", async (req, res) => {
  const post = await PostController.editPost(req.params.id, req.body);
  res.send(post);
});

router.delete("/:id", async (req, res) => {
  await PostController.deletePost(req.params.id);
  res.status(204);
  res.send();
});

router.post(
  "/:id/profilePictureLocal",
  uploadFirebase.single("profilePicture"),
  (req, res) => {
    const { id } = req.params;
    console.log(req.file);
    const path = req.file.path.replace("src\\", "");
    console.log(path);
    PostController.savePostPicture(`${id},http://localhost:3000/${path}`); // Modificar la url
  }
);

router.get("/:id/getProfilePicture", isAuthenticated, (req, res) => {
  const { id } = req.params;
  res.send({ url: PostController.getPostPicture(id) });
});

module.exports = router;
