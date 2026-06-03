import { test } from '@playwright/test';

export class TodosService {
    constructor(request, baseURL) {
        this.request = request;
        this.baseURL = baseURL;
    }

    async getTodos(token) {
        return test.step("Получить список todo GET /todos", async () => {
            const response = await this.request.get(`${this.baseURL}todos`, {
                headers: {
                    "x-challenger": token,
                },
            });
            return response;
        });
    }

    async postTodos(token, todo) {
        return test.step("Создать todo POST /todos", async () => {
            const response = await this.request.post(`${this.baseURL}todos`, {
                headers: {
                    "x-challenger": token,
                },
                data: todo,
            });
            return response;
        });
    }

    async putTodos(token, todo, id) {
        return test.step("Изменить todo PUT /todos", async () => {
            const response = await this.request.put(`${this.baseURL}todos/${id}`, {
                headers: {
                    "x-challenger": token,
                },
                data: todo,
            });
            return response;
        });
    }

    async deleteTodos(token, id) {
        return test.step("DELETE /todos/{id}", async () => {
            const response = await this.request.delete(`${this.baseURL}todos/${id}`, {
                headers: {
                    "x-challenger": token,
                },
            });
            return response;
        });
    }
}