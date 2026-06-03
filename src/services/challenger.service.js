import { test } from '@playwright/test';

export class ChallengerService {
    constructor(request, baseURL) {
        this.request = request;
        this.baseURL = baseURL;
    }

    async post() {
        return test.step("POST /challenger", async () => {
            const response = await this.request.post(`${this.baseURL}challenger`);
            return response;
        });
    }
}