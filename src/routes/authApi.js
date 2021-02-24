import { Router } from 'express';
import { usersController } from '../controllers/index';
import UserValidations from '../validations/UserValidations';


const routes = Router();

/**
 * Create and return a new user inforrmation.
 * @returns { Object(name, username,email, token)                                  }  Status: [200] Created
 * @returns { Array(Object(field, message))                                        }  Status: [400] Invalid Request Data
 * @returns { Array(Object(field, message))                                        }  Status: [409] Conflicting data
*/
routes.post('/register', UserValidations.registerValidator, usersController.register);

/**
 * Find an existing user and return a token, email
 * @returns { Object(token, username,email, status)                 }  Status: [201] Created
 * @returns { Array(Object(field, message))                         }  Status: [400] Invalid Request Data
 * @returns { Array(Object(field, message))                         }  Status: [404] User Not Found
 */

routes.post('/login', UserValidations.loginValidator, usersController.login);


export default routes;  