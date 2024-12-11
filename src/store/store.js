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
            localStorage.removeItem('role');
            const response = await Auth.login(phone, password);
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('role', response.data.data.role);
            console.log(response)
            this.setAuth(true, response.data.data.role);
            navigate('/');
        } catch (e) {
            alert(e.response?.data?.message || 'Произошла ошибка при входе');
        }
    }

    async register(phone, password, fio, navigate) {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            const response = await Auth.register(phone, password, fio);
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('role', response.data.data.role);
            this.setAuth(true, response.data.data.role);
            navigate('/');
        } catch (e) {
            alert(e.response?.data?.message || 'Произошла ошибка при регистрации');
        }
    }

}