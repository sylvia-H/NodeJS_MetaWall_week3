const successHandler = require('../helper/successHandlers');
const errorHandler = require('../helper/errorHandlers');
const Post = require('../model/post');

const PostController = {
  async getPosts(req, res) {
    const posts = await Post.find();
    successHandler(res, posts);
  },
  async createPosts(req, res) {
    try {
      const { author, content, tags, image, likes, comments, privacy } =
        req.body;
      if (author !== undefined && content !== undefined) {
        await Post.create({
          author,
          content,
          tags,
          image,
          likes,
          comments,
          privacy,
        });
        PostController.getPosts(req, res);
      } else {
        errorHandler(res, 400, 4001);
      }
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async deleteAllPosts(req, res) {
    const posts = await Post.deleteMany({});
    successHandler(res, posts);
  },
  async deletePosts(req, res) {
    try {
      const { id } = req.params;
      await Post.findByIdAndDelete(id)
        .then(() => PostController.getPosts(req, res))
        .catch(() => errorHandler(res, 400, 4003));
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async editPosts(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;
      await Post.findByIdAndUpdate(id, body)
        .then(() => PostController.getPosts(req, res))
        .catch(() => errorHandler(res, 400, 4003));
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
};

module.exports = PostController;
