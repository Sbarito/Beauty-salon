import { makeAutoObservable } from "mobx";
import Auth from "../services/Auth";

export default class Store {
    isAuth = false;
    isRole = null;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool, role) {
        this.isAuth = bool;
        this.isRole = role;
    }

    async login(phone, password, navigate) {
        try {
            localStorage.removeItem('token');
            const response = await Auth.login(phone, password);
            this.setAuth(true, response.data.data.role);
            navigate('/');
            localStorage.setItem('token', response.data.data.token);
        } catch (e) {
            alert(e.response?.data?.message || 'Произошла ошибка при входе');
        }
    }

    async register(phone, password, fio, navigate) {
        try {
            localStorage.removeItem('token');
            const response = await Auth.register(phone, password, fio);
            this.setAuth(true, response.data.data.role);
            navigate('/');
            localStorage.setItem('token', response.data.data.token);
        } catch (e) {
            alert(e.response?.data?.message || 'Произошла ошибка при регистрации');
        }
    }
}