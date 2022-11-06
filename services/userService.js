import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fg, post, put, fd } from '../helpers/fetcher';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/user`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: ud
};

function login(email, password) {
    return post(`${baseUrl}/authenticate`, { email, password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
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

function update(id, params) {
    return put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function ud(id) {
    return fd(`${baseUrl}/${id}`);
}