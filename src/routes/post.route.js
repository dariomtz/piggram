const router = require("express").Router();
const PostController = require("../controllers/post.controller")
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
      PostController.savePostPicture(`${id},http://localhost:3000/${path}`); // Modificar la url
    }
  );
  
  router.get("/:id/getProfilePicture", isAuthenticated, (req, res) => {
    const { id } = req.params;
    res.send({ url: PostController.getPostPicture(id) });
  });