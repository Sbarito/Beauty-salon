import $api from "../http";

export default class Auth {
    static async register(phone, password, fio) {
        return $api.post('/auth/sign-up', {phone, password, fio})
    }
    static async login(phone, password) {
        return $api.post('/auth/sign-in', {phone, password})
    }
}