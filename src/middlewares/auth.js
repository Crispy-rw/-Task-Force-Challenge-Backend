import helper from '../utils/helpers';
import sendResult from '../utils/sendResult';

/**
 * This Object contains properties that check for token
 */

const Auth = {
  /**
 * This function properties that check for token
 * @param {object} request
 * @param {object} response
 * @param {Function} next
 */
  checkToken(request, response, next) {
    const token = helper.getToken(request);
    const data = helper.verifyToken(token);
    if (data.error) {
      return sendResult(response, 401, 'You are not authorized');
    }

    request.user = data;
    return next();
  },
}


export default Auth