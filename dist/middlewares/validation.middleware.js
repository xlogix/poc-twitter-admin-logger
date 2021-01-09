import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import HttpException from '../exceptions/HttpException';
function validationMiddleware(type, skipMissingProperties = false) {
    return (req, res, next) => {
        validate(plainToClass(type, req.body), { skipMissingProperties })
            .then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => Object.values(error.constraints)).join(', ');
                next(new HttpException(400, message));
            }
            else {
                next();
            }
        });
    };
}
export default validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map