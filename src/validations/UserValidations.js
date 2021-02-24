import * as yup from 'yup';
import sendResult from '../utils/sendResult';
/**
 * UserValidations module
 * 
 */

const UserValidations = {
  registerValidator: async (request, response, next) => {
    try {

      const UserSchema = yup.object().shape({
        name: yup.string(25).min(5).max(25).required().trim(),
        email: yup.string(25).min(5).max(25).email().required().trim(),
        password: yup.string().min(4).max(25).required(),
        confirmPassword: yup.string().test('passwords-match', 'Password and confirmPassword must match', function (value) {
          return this.parent.password === value;
        })
      })

      await UserSchema.validate(request.body);

      return next();
    } catch (error) {
      return response.status(400).json({ status: 400, error: error.message })
    }
  },
  loginValidator: async (request, response, next) => {
    try {
      const UserSchema = yup.object().shape({
        email: yup.string(25).min(5).max(25).email().required().trim(),
        password: yup.string(25).min(4).max(25).required().trim(),
      })
      await UserSchema.validate(request.body);

      return next();

    } catch (error) {
      return sendResult(response, 400, error.message);
    }
  }
}

export default UserValidations;