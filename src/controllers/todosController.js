import TodoServices from '../services/TodoServices';
import sendResult from '../utils/sendResult';

class TodosController {
  /**
   * This method is part of the todo CRUP pattern
   * It returns all available todo item based on the provided token
   *
   * @param {object} request - The request object
   * @param {object} response- The response object
   * @return {object} - return a response to the client
   *
   */
  static async index(request, response) {
    const { id: userId } = request.user;
    // Select All Items
    const data = await TodoServices.getAll({ userId });

    return sendResult(response, 200, "Todo Items Found", data);
  }




  /**
   * This method is part of the CRUO Pattern
   * It created a new Todo Item
   *
   * @param {object} request - The request object { body: Object( title, description, priority) }
   * @param {object} response- The response object
   * @return {object} - return a response to the client
   *
   */
  static async store(request, response) {
    const { title, description, priority } = request.body;
    // Check if Item aleady exists
    const checkItem = await TodoServices.getOne({ title });

    if (checkItem) sendResult(response, 400, "Item Already Exists");
    // Add new Item
    const newItem = await TodoServices.createItem({ title, description, priority, userId: request.user.id });
    // Send Response
    return sendResult(response, 201, "New Item Created", newItem);
  }




  /**
   * This method is part of user CRUD pattern.
   * It queries the model and returns data basing on the search criteria.
   * @param   { Object } request { params: todo_id }
   * @param   { Object } response
   * @returns { Object }
   */
  static async getOne(request, response) {
    const { todo_id: id } = request.params;
    // Check Item
    const item = await TodoServices.getOne({ id });

    if (!item) return sendResult(response, 404, "Oops Todo Item not Found");

    return sendResult(response, 200, "Data Found", item);
  }




  /**
     * This method is part of user CRUD pattern.
     * It updates an existing Todo Item and returns the updated item information.
     *
     * @param { Object } Request { params: todo_id, body: Object( title, descriptiob,priorit) }
     * @param {Object } Response
     * @returns { Object }
     */
  static async update(request, response) {
    const { todo_id: id } = request.params;
    const { title, description, priority } = request.body;
    const { id: userId } = request.user;
    // Check if item exists
    const checkItem = await TodoServices.getOne({ id, userId });
    //Send response of Item does not exist
    if (!checkItem) return sendResult(response, 401, "TodoItem does not exist");
    // Update Item
    const todoItem = await TodoServices.update(id, { title, description, priority })
    //Send Response
    return sendResult(response, 200, "Todo Item Updated", todoItem);
  }





  /**
     * This method is part of user CRUD pattern.
     * It deletes an existing Item account and returns None
     * @param   { Object } request
     * @param   { Object } response
     * @returns { Object }
     */
  static async delete(request, response) {
    const { todo_id: id } = request.params;

    const checkItem = await TodoServices.getOne({ id });
    //Send response of Item does not exist
    if (!checkItem) return sendResult(response, 401, "TodoItem does not exist");

    // Delete Item
    await TodoServices.delete(id);

    return sendResult(response, 200, "Todo Item Deleted");
  }
  /**
   * This is a function.
   *
   * @param {object} request - The request object
   * @param {object} response- The response object
   * @return {object} - return a response to the client
   *
   */
  static async export(request, response) {
    return response.status(200).send();
  }
}
export default TodosController;
