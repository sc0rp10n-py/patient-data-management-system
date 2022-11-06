const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';

import {find} from '../../../helpers/api/users-data';
import {ahandler} from '../../../helpers/api/ahandler';

const { serverRuntimeConfig } = getConfig();

export default ahandler({
    post: authenticate
});

function authenticate(req, res) {
    const { email, password } = req.body;
    const user = find(u => u.email === email);

    // validate
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Email or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // return basic user details and token
    return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        city: user.city,
        country: user.country,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        type: user.type,
        adminVerify: user.adminVerify,
        token
    });
}