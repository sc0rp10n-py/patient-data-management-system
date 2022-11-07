import fs from 'fs';

let files = JSON.parse(fs.readFileSync('data/files.json'));

export function getAll() {
    return files;
}

export function getById(id) {
    return files.find(x => x.id.toString() === id.toString());
}

export function find(x) {
    // console.log("x", x);
    return files.find(x);
}

export function create(file) {
    // generate new file id
    file.id = files.length ? Math.max(...files.map(x => x.id)) + 1 : 1;

    // set date created and updated
    file.dateCreated = new Date().toISOString();
    file.dateUpdated = new Date().toISOString();

    // add and save file
    files.push(file);
    saveData();
}

export function update(id, params) {
    const file = files.find(x => x.id.toString() === id.toString());

    // set date updated
    file.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(file, params);
    saveData();
}

export function filed(id) {
    // filter out deleted file and save
    files = files.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

function saveData() {
    fs.writeFileSync('data/files.json', JSON.stringify(files, null, 4));
}