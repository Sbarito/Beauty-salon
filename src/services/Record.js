import $api from "../http";

export default class Record {
    static getTimeSlots(date, masterId) {
        const url = `/record/get-time-slots?date=${date}&master_id=${masterId}`;
        return $api.get(url);
    }
    static createRecord(masterId, timeSlotId, serviceId, date, userId) {
        const body = {
            masterId,
            timeSlotId,
            serviceId,
            date,
            userId
        };
        return $api.post('/record/create', body);
    }
    static deleteRecord(recordId) {
        const url = `/record/delete/${recordId}`;
        return $api.delete(url);
    }
    static getActiveRecords() {
        const url = '/record/get-active-records';
        return $api.get(url);
    }
    static getMyRecords() {
        const url = '/record/get-my-records';
        return $api.get(url);
    }
}