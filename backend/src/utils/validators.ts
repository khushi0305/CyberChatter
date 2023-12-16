import { NextFunction } from "express";
import { body, ValidationChain } from "express-validator";

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for(let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
    }
};

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required."),
    body("email").trim().isEmail().withMessage("Email is required."),
    body("password")
    .trim()
    .isLength({min:6})
    .withMessage("Password should contain atleast 6 characters."),
]