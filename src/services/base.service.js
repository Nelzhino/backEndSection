const { Exceptions } = require('../helpers');
class BaseService {

    constructor(repository) {
        this.repository = repository;
    }

    async get(id) {
        if (!id) {
            Exceptions.exceptions({ status: 400, message: 'id must be sent' });
        }

        const currentEntity = await this.repository.get(id);
        if (!currentEntity) {
            Exceptions.exceptions({ status: 404, message: 'entity does not found' });
        }
        return currentEntity;
    }


    async getAll(pageSize, pageNum) {
        return await this.repository.getAll(pageSize, pageNum);
    }

    async create(entity) {
        return await this.repository.create(entity);
    }

    async update(id, entity) {
        if (!id) {
            Exceptions.exceptions({ status: 400, message: 'id must be sent' });
        }

        return await this.repository.update(id, entity);
    }

    async delete(id) {
        if (!id) {
            Exceptions.exceptions({ status: 400, message: 'id must be sent' });
        }

        return await this.repository.delete(id);
    }
}

module.exports = BaseService;