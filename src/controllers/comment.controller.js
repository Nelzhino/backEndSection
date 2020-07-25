let _commentService = null;
class CommentController {


    constructor({ CommentService }) {
        _commentService = CommentService;
    }

    async get(req, res) {
        const { commentId } = req.params;
        const comment = await _commentService.get(commentId);

        return res.send(comment);
    }

    async getAll(req, res) {
        const comments = await _commentService.getAll();
        return res.send(comments);
    }


    async update(req, res) {
        const { body } = req;
        const { commentId } = req.params;
        const updateComment = await _commentService.update(commentId, body);
        return res.send(updateComment);
    }

    async delete(req, res) {
        const { commentId } = req.params;
        const deletedComment = await _commentService.delete(commentId);
        return res.send(deletedComment);
    }

    async createComment(req, res) {
        const { body } = req;
        const { ideasId } = req.params;
        const createdComment = await _commentService.createdComment(body, ideasId);


    }
    async getIdeaComments(res, req) {
        const { ideasId } = req.params;
        const comments = await _commentService.getIdeasComments(ideasId);

        return res.send(comments);
    }

    async createComment(res, req) {
        const { body } = req;
        const { ideasId } = req.params;
        const createdComment = await _commentService.createComment(body, ideaId);

        return res.status(201).send(createdComment);
    }
}

module.exports = CommentController;