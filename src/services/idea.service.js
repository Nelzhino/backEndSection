const BaseService = require('./base.service');
const { Exceptions } = require('../helpers');
let _ideaRepository = null;

class IdeaService extends BaseService {

    constructor({ IdeaRepository }) {
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }

    async getUserIdea(author) {
        if (!author) {
            Exceptions.exceptions({ status: 400, message: 'userId must be sent' });
        }

        return await _ideaRepository.getUserIdea(author);
    }

    async upvoteIdea(ideaId) {
        if (!ideaId) {
            Exceptions.exceptions({ status: 400, message: 'ideaId must be sent' });
        }

        const idea = await _ideaRepository.get(ideaId);

        if (!idea) {
            Exceptions.exceptions({ status: 404, message: 'idea does not exist' });
        }

        idea.upvotes.push(true);

        return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
    }


    async downvoteIdea(ideaId) {
        if (!ideaId) {
            Exceptions.exceptions({ status: 400, message: 'ideaId must be sent' });
        }

        const idea = await _ideaRepository.get(ideaId);

        if (!idea) {
            Exceptions.exceptions({ status: 404, message: 'idea does not exist' });
        }

        idea.downvotes.push(true);

        return await _ideaRepository.update(ideaId, { downvotes: idea.downvotes });
    }

}

module.exports = IdeaService;