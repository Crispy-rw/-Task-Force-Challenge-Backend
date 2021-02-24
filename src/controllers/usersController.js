import bcrypt from 'bcryptjs';
import db from '../database/models';
import { UserServices } from '../services/index';
import sendResult from '../utils/sendResult';
import helpers from '../utils/helpers';

class UsersController {

  /**
 * This is a function.
 *
 * @param {object} request - The request object
 * @param {object} response- The responseponse object
 * @return {object} - return a responseponse to the client
 *
 */
  static async register(request, response) {
    try {
      const { email, password, name } = request.body;

      const checkUser = await UserServices.getOne({ email });

      if (checkUser) return sendResult(response, 409, "User Already exist");

      const newUser = await UserServices.createUser({
        email,
        password: helpers.hashPassword(password),
        name
      });
      delete newUser["password"];

      const token = helpers.createToken(newUser.id, newUser.email, newUser.name);

      const data = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token
      }

      return sendResult(response, 201, 'User logged successfully', data);

    } catch (error) {
      return sendResult(response, 500, "Server Error");
    }
  }

  /**
   * This is a function.
   *
   * @param {object} request - The request object
   * @param {object} response- The responseponse object
   * @return {object} - return a responseponse to the client
   *
   */
  static async login(request, response) {
    try {
      const { email, password } = request.body;

      const checkUser = await UserServices.getOne({ email });

      if (!checkUser) return sendResult(response, 401, 'The email and/or password is invalid');

      const comfirmPass = helpers.comparePassword(password, checkUser.password);

      if (!comfirmPass) return sendResult(response, 401, 'The email and/or password is invalid');

      const {
        id, name
      } = checkUser;

      const token = helpers.createToken(id, email, name);

      const data = {
        id, name, email, token
      };

      return sendResult(response, 200, 'User logged successfully', data);

    } catch (error) {
      return sendResult(response, 500, "Server Error");
    }
  }

}
export default UsersController;
