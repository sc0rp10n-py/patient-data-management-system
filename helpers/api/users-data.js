import fs from 'fs';

let users = JSON.parse(fs.readFileSync('data/users.json'));

// export const userData = {
//     getAll: () => users,
//     getById: id => users.find(x => x.id.toString() === id.toString()),
//     find: x => users.find(x),
//     create,
//     update,
//     delete: _delete
// };

// let users = us;

export function getAll() {
    return users;
}

export function getById(id) {
    return users.find(x => x.id.toString() === id.toString());
}

export function find(x) {
    // console.log("x", x);
    return users.find(x);
}

export function create(user) {
    // generate new user id
    user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
}

export function update(id, params) {
    const user = users.find(x => x.id.toString() === id.toString());

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
export function userd(id) {
    // filter out deleted user and save
    users = users.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}