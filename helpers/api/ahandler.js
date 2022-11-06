import {errHandler} from './errHandler';
import {jwtMw} from './jwt-mw';

export { ahandler };

function ahandler(h) {
    return async (req, res) => {
        const method = req.method.toLowerCase();

        // check handler supports HTTP method
        if (!h[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // global middleware
            await jwtMw(req, res);

            // route handler
            await h[method](req, res);
        } catch (err) {
            // global error handler
            errHandler(err, res);
        }
    }
}