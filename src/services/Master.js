import $api from "../http";

export default class Masters {
    static getMasters() {
        return $api.get('/master/get-all');
    }

    static createMaster(masterFio) {
        return $api.post('/master/create', { masterFio });
    }

    static assignService(mastersId, serviceId) {
        return $api.post('/master/assign-service', { mastersId, serviceId });
    }
}