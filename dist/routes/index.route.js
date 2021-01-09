import { Router } from 'express';
import IndexController from '../controllers/index.controller';
class IndexRoute {
    constructor() {
        this.path = '/';
        this.router = Router();
        this.indexController = new IndexController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.indexController.index);
    }
}
export default IndexRoute;
//# sourceMappingURL=index.route.js.map