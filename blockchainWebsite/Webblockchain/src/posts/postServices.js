let {User} = require("../users/userModel")
let {Post} = require("./postModel")

let findOneModel = async (model, id) => {
  return await model.findOne({
    attributes: {exclude: ["password", "role"]},
    where: {
      id: id,
    },
  });
}

let createPost = async (titlePost, contentPost, posterPost) => {
  let result = await Post.findOrCreate({
    where: {
      title: titlePost,
      content: contentPost,
      poster: posterPost,
    }
  });
  return result[0];
}

let getPost = async (postId) => {
  let getPost = await findOneModel(Post, postId);
  if (getPost === null) {
    return null
  }
  let getUser = null;
  if (getPost !== null) {
    getUser = await findOneModel(User, getPost.poster);
  }
  return {
    post: getPost,
    poster: getUser
  };
}

let updatePost = async (postId, titlePost, contentPost, posterPost) => {
  let getPost = await findOneModel(Post, postId);
  if (getPost === null) {
    return null
  }
  await Post.update({
    title: titlePost,
    content: contentPost,
    poster: posterPost,
  }, {
    where: {
      id: postId
    }
  })
  let result = await findOneModel(Post, postId);
  return result
}

let deletePost = async (postId) => {
  let getPost = await findOneModel(Post, postId);
  if (getPost === null) {
    return null
  }
  await Post.destroy({
    where: {
      id: postId
    }
  })
  return {}
}

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};