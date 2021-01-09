class IndexController {
    constructor() {
        this.index = (req, res, next) => {
            try {
                res.sendStatus(200);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default IndexController;
//# sourceMappingURL=index.controller.js.map