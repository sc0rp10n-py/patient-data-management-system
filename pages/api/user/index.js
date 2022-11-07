import {getAll} from '../../../helpers/api/users-data';
import {ahandler} from '../../../helpers/api/ahandler';
import {omit} from '../../../helpers/api/omit';

export default ahandler({
    get: getUsers
});

function getUsers(req, res) {
    // return users without hashed passwords in the response
    const response = getAll().map(x => omit(x, 'hash'));
    const ress = response.filter((user) => user.type !== 'pirogod');
    return res.status(200).json(ress);
}