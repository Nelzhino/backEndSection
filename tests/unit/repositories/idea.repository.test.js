const { IdeaRepository } = require('../../../src/repositories');
const mockingoose = require('mockingoose').default;
const { Idea } = require('../../../src/models');

let {
    IdeaModelMock: { idea, ideas }
} = require('../../mocks');


describe('Idea Repository', () => {

    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });


    it('Should find a idea by id', async() => {
        const _idea = {...idea };
        mockingoose(Idea).toReturn(idea, "findOne");

        const _ideaRepository = new IdeaRepository({ Idea });
        const expected = await _ideaRepository.get(_idea._id);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_idea);
    });

    it('Should find some ideas by UserIdea', async() => {
        const _idea = {...idea };
        mockingoose(Idea).toReturn(ideas, "find");

        const _ideaRepository = new IdeaRepository({ Idea });
        const expected = await _ideaRepository.getUserIdeas(_idea.author);
        const objectJson = JSON.parse(JSON.stringify(expected));
        expect(expected).toBeDefined();
        expect(objectJson.length).toBeGreaterThan(0);
        expect(objectJson[0]).toMatchObject(_idea);
    });


    // it("Should update an especific user by id", async () => {
    //     const _user = { ...user };
    //     delete _user.password;
    //     mockingoose(User).toReturn(_user, "findOneAndUpdate");
    //     const _userRepository = new UserRepository({ User });
    //     const expected = await _userRepository.update(user._id, {
    //       name: "Marluan"
    //     });

    //     expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    //   });

    //   it("Should delete an especific user by id", async () => {
    //     mockingoose(User).toReturn(user, "findOneAndDelete");
    //     const _userRepository = new UserRepository({ User });
    //     const expected = await _userRepository.delete(user._id);
    //     expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    //   });

});