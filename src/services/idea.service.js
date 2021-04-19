const BaseService = require('./base.service');
const { exceptions } = require('../helpers/exceptions');
let _ideaRepository = null;

class IdeaService extends BaseService {

    constructor({ IdeaRepository }) {
        super(IdeaRepository);
        _ideaRepository = IdeaRepository;
    }

    async getUserIdea(author) {
        if (!author) {
            exceptions({ status: 400, message: 'userId must be sent' });
        }

        return await _ideaRepository.getUserIdea(author);
    }

    async upvoteIdea(ideaId) {
        if (!ideaId) {
            exceptions({ status: 400, message: 'ideaId must be sent' });
        }

        const idea = await _ideaRepository.get(ideaId);

        if (!idea) {
            exceptions({ status: 404, message: 'idea does not exist' });
        }

        idea.upvotes.push(true);

        return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
    }


    async downvoteIdea(ideaId) {
        if (!ideaId) {
            exceptions({ status: 400, message: 'ideaId must be sent' });
        }

        const idea = await _ideaRepository.get(ideaId);

        if (!idea) {
            exceptions({ status: 404, message: 'idea does not exist' });
        }

        idea.downvotes.push(true);

        return await _ideaRepository.update(ideaId, { downvotes: idea.downvotes });
    }

}

module.exports = IdeaService;