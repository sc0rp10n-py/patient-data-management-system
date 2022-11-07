import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fg, post, post2, post3, put, fd } from "../helpers/fetcher";
// import { create } from "../helpers/api/files-data";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/user`;
const userSubject = new BehaviorSubject(
    process.browser && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
    user: userSubject.asObservable(),
    get userValue() {
        return userSubject.value;
    },
    login,
    logout,
    register,
    getAll,
    getById,
    // update,
    uploadFile,
    uploadFileSet,
    getFiles,
    getLicense,
    viewFile,
    verifyUser,
    deleteUser,
    deleteFile,
    shareFile,
    getSharedFiles,
    editProfile,
    delete: ud,
};

function login(email, password) {
    return post(`${baseUrl}/authenticate`, { email, password }).then((user) => {
        // publish user to subscribers and store in local storage to stay logged in between page refreshes
        userSubject.next(user);
        localStorage.setItem("user", JSON.stringify(user));

        return user;
    });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem("user");
    userSubject.next(null);
    Router.push("/account/login");
}

function register(user) {
    return post(`${baseUrl}/register`, user);
}

function getAll() {
    return fg(baseUrl);
}

function getById(id) {
    return fg(`${baseUrl}/${id}`);
}

// function update(id, params) {
//     return put(`${baseUrl}/${id}`, params).then((x) => {
//         // update stored user if the logged in user updated their own record
//         if (id === userSubject.value.id) {
//             // update local storage
//             const user = { ...userSubject.value, ...params };
//             localStorage.setItem("user", JSON.stringify(user));

//             // publish updated user to subscribers
//             userSubject.next(user);
//         }
//         return x;
//     });
// }

function editProfile(data) {
    return post(`${baseUrl}/editProfile`, data);
}

function uploadFileSet(file) {
    var object = {};
    file.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);
    return post2(`${baseUrl}/uploadSet`, json);
}

function uploadFile(file) {
    return post2(`${baseUrl}/upload`, file);
}

function getFiles(email) {
    return post(`${baseUrl}/getFiles`, email);
}

function getSharedFiles(email) {
    return post(`${baseUrl}/getSharedFiles`, email);
}

function getLicense(email) {
    return post(`${baseUrl}/getLicense`, email);
}

function verifyUser(email) {
    return post(`${baseUrl}/verifyUser`, email);
}

function deleteUser(email) {
    return post(`${baseUrl}/deleteUser`, email);
}

function deleteFile(id) {
    return post(`${baseUrl}/deleteFile`, id);
}

function shareFile(data) {
    var object = {};
    data.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);
    return post3(`${baseUrl}/shareFile`, json);
}

function viewFile(file) {
    return post(`${baseUrl}/viewFile`, file);
}

// prefixed with underscored because delete is a reserved word in javascript
function ud(id) {
    return fd(`${baseUrl}/${id}`);
}
