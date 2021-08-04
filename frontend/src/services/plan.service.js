import http from "../http-common"

class PlanDataService {

    getAll() {
        return http.get(`/planes`);
    }

    createPlan(data) {
        return http.post("/planes", data);
    }

    updatePlan(id, data) {
        return http.put(`/planes/${id}`, data);
    }

    deletePlan(id) {
        return http.delete(`/planes/${id}`);
    }
    
}
    
export default new PlanDataService();