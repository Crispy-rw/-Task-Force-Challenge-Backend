import helper from '../utils/helpers';
import sendResult from '../utils/sendResult';


const Auth = {
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