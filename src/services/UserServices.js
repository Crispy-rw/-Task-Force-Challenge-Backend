import db from '../database/models';

const UserService = {
    async createUser(user) {
        const result = await db.User.create(user);
        return result.get({ plain: true });
    },
    async getOne(condition) {
        return await db.User.findOne({
            where: condition,
        });
    }
}

export default UserService;