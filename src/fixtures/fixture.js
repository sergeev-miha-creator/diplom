import { test as base, expect as baseExpect } from '@playwright/test';
import { App } from "../pages/app.page";
import { ApiClient } from "../services/apiClient";

export const test = base.extend({
    app: async ({ page }, use) => {
        const app = new App(page);
        await app.main.visit();
        await use(app);
    },

    api: async ({ request }, use, testInfo) => {
        // Берём apiURL из конфига
        const apiURL = testInfo.project.use.apiURL;
        
        if (!apiURL) {
            throw new Error('apiURL не задан в playwright.config.js');
        }
        
        const apiClient = new ApiClient(request, apiURL);
        await use(apiClient);
    },
});

export const expect = baseExpect;