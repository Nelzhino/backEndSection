const BaseService = require('./base.service');
const { Exceptions } = require('../helpers');
let _commentRepository = null,
    _ideaRepository = null;


class CommentService extends BaseService {

    constructor({ CommentRepository, IdeaRepository }) {
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    async getIdeaComments(ideaId) {

        if (!ideaId) {
            Exceptions.exceptions({ status: 400, message: 'ideaId must be sent' });
        }

        const idea = await _ideaRepository.get(ideaId);

        if (!idea) {
            Exceptions.exceptions({ status: 404, message: 'idea does not exist' });
        }

        const { comments } = idea;

        return comments;
    }


    async createComment(comment, ideaId) {
        if (!ideaId) {
            Exceptions.exceptions({ status: 400, message: 'ideaId must be sent' });
        }

        const idea = await _ideaRepository.get(ideaId);

        if (!idea) {
            Exceptions.exceptions({ status: 404, message: 'idea does not exist' });
        }


        const createdComment = await _commentRepository.create(comment);
        idea.comments.push(createdComment);

        return await _ideaRepository.update(ideaId, { comments: idea.comments });
    }
}

module.exports = CommentService;