import * as yup from 'yup';
import sendResult from '../utils/sendResult';

/**
 * UserValidations module
 * 
 */

const ItemValidation = {
  validatorBody: async (request, response, next) => {
    try {

      const ItemSchema = yup.object().shape({
        title: yup.string(25).min(5).max(25).required().trim(),
        description: yup.string(100).min(5).max(100).required(),
        priority: yup.mixed().oneOf(["LOW", "MEDIUM", "HIGH"]),
      })

      await ItemSchema.validate(request.body);

      return next();
    } catch (error) {
      return sendResult(response, 400, error.message);
    }
  },
}

export default ItemValidation;