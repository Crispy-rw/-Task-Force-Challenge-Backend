import { updateLocale } from 'moment';
import { create } from 'yup/lib/Reference';
import db from '../database/models';


const TodoService = {
    async getOne(condition) {
        return await db.Todo.findOne({
            where: condition, raw: true
        });
    },
    async createItem(item) {
        const result = await db.Todo.create(item);
        return result.get({ plain: true });
    },
    async update(id, item) {
        const user = await db.Todo.update(item, {
            where: { id }, returning: true, plain: true, raw: true,
        });
        return user[1];
    },
    async delete(id) {
        return await db.Todo.destroy({ where: { id } });
    },
    async getAll(condition) {
        return await db.Todo.findAll({ where: condition });
    }
}

export default TodoService;