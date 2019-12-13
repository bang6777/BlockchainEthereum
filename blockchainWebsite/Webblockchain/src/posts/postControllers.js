let express = require("express");
let router = new express.Router();

let {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("./postServices");
let {postValidator} = require("./postValidator");

router.post("/", async (req, res, next) => {
  try {
    let titlePost = req.body.title;
    let contentPost = req.body.content;
    let posterPost = req.body.poster;

    let validator = await postValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }
    let result = await createPost(titlePost, contentPost, posterPost);
    return res.send({
      message: "Create successfully.",
      data: result
    });
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

router.get("/:postId", async (req, res, next) => {
  try {
    let {postId} = req.params;
    let result = await getPost(postId);
    if (result === null) {
      return res.status(404).send({message: "Not found Post"});
    }
    return res.send({result});
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

router.put("/:postId", async (req, res, next) => {
  try {
    let {postId} = req.params;
    let titlePost = req.body.title;
    let contentPost = req.body.content;
    let posterPost = req.body.poster;

    let validator = await postValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }

    let result = await updatePost(postId, titlePost, contentPost, posterPost);
    if (result === null) {
      return res.status(404).send({message: "Not found Post"});
    }
    return res.send({
      message: "Update successfully.",
      data: result
    });
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

router.delete("/:postId", async (req, res, next) => {
  try {
    let {postId} = req.params;
    let result = await deletePost(postId);
    if (result === null) {
      return res.status(404).send({message: "Not found Post"});
    }
    return res.send({
      message: "Delete successfully.",
      data: result
    });
  } catch (error) {
    return res.status(500).send({error: "Server Error"});
  }
});

module.exports = router;