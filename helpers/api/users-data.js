import fs from 'fs';

let users = JSON.parse(fs.readFileSync('data/users.json'));

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

export function edit(id, params) {
    const user = getById(id);

    // validate
    if (!user) return;

    // copy params to user and save
    Object.assign(user, params);
    user.dateUpdated = new Date().toISOString();
    saveData();

    return user;
}

// export function update(id, params) {
//     const user = users.find(x => x.id.toString() === id.toString());

//     // set date updated
//     user.dateUpdated = new Date().toISOString();

//     // update and save
//     Object.assign(user, params);
//     saveData();
// }

export function verify(email) {
    const user = users.find(x => x.email === email);
    user.adminVerify = true;
    saveData();
}

export function userd(email) {
    // filter out deleted user and save
    users = users.filter(x => x.email !== email);
    saveData();
    
}

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}