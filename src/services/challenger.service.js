import {request} from "@playwright/test";

export class ChallengerService {
    constructor (options){
        this.options = options;
        this.baseURL = options.URL || 'https://apichallenges.herokuapp.com/';
    }

    async post(){
        const apiRequest = await request.newContext();
        const response1 = await apiRequest.post(`${this.baseURL}challenger`);
        return response1;
    }
}