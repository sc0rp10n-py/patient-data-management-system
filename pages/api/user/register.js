const bcrypt = require("bcryptjs");

import {find, create} from "../../../helpers/api/users-data";
import {ahandler} from "../../../helpers/api/ahandler";

export default ahandler({
    post: register
});

function register(req, res) {
    // split out password from user details
    const { password, ...user } = req.body;

    // validate
    if (find((x) => x.email === user.email))
        throw `User with the username "${user.email}" already exists`;

    // hash password
    user.hash = bcrypt.hashSync(password, 10);

    create(user);
    return res.status(200).json({});
}
