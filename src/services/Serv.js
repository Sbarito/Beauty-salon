import $api from "../http";

export default class Serv {
    static getServ() {
        return $api.get('/services/get-all');
    }

    static createServ(body) {
        return $api.post('/services/create', body);
    }

    static delServ(serviceId) {
        return $api.delete(`/services/delete/${serviceId}`);
    }

    static updateServ(serviceId, body) {
        return $api.put('/services/update', { serviceId, ...body });
    }
}