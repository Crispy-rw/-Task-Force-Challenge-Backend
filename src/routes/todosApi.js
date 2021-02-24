import { Router } from "express";
import { todosController } from "../controllers/index";
import ItemValidation from '../validations/TodoValidations';
import Auth from '../middlewares/auth';

const router = Router();

/**
 * Creates a new Item and return a title, description, priority
 * @returns { Object(title,description, priority, createdAt)                  }  Status: [201] Created
 * @returns { Array(Object(field, message))                         }  Status: [400] Invalid Request Data
 */
router.post("/", ItemValidation.validatorBody, Auth.checkToken, todosController.store);

// /**
//  * 
//  */
router.get("/", Auth.checkToken, todosController.index);

// /**
//  * Get a Single Item
//  */
router.get("/:todo_id([0-9]{1,10})", todosController.getOne);

/**
 * Update a Single Item
 */
router.put("/:todo_id([0-9]{1,10})", Auth.checkToken, ItemValidation.validatorBody, todosController.update);

/**
 * Delete a Single Item
 */
router.delete("/:todo_id([0-9]{1,10})", Auth.checkToken, todosController.delete);

export default router;
