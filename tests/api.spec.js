import { expect } from "@playwright/test";
import { test } from "../src/fixtures/fixture";
import { TodoBuilder } from "../src/builders/todoBuilder";

test.describe("API challenge", () => {
    let token;

    test.beforeAll(async ({api}) => {
        const response = await api.challenger.post();
        const headers = response.headers();

        token = headers["x-challenger"];

    });

    test("GET /todos (200)", {tag: '@API'}, async ({api}) => {

        const response = await api.todos.getTodos(token)
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(response.headers()).toEqual(expect.objectContaining({"x-challenger": token}));
        expect(body.todos.length).toBe(10);
    });

   

    test("POST /todos (201)", {tag: '@API'}, async ({api}) => {

        const todo = new TodoBuilder()
            .addTitle()
            .addDescription()
            .addDoneStatus(false)
            .generate();


        const response = await api.todos.postTodos(token, todo);

        const body = await response.json();
        expect(response.status()).toBe(201);
        expect(response.headers()).toEqual(expect.objectContaining({"x-challenger": token}));
        expect(body.doneStatus).toEqual(false);
        expect(body.title).toBe(todo.title);
        expect(body.description).toBe(todo.description);
    });


    test("POST /todos (400) title too long", {tag: '@API'}, async ({api}) => {

        const todo = new TodoBuilder()
            .withTitleExceedingMaxLength()
            .addDescription()
            .addDoneStatus(false)
            .generate();
            
        const response = await api.todos.postTodos(token, todo);

        const body = await response.json();
        expect(response.status()).toBe(400);
        expect(body.errorMessages[0]).toContain("Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50");
    });


    test("PUT /todos/{id} ", {tag: '@API'}, async ({api}) => {

        const todo = new TodoBuilder()
            .addDescription()
            .addDoneStatus(false)


        const response = await api.todos.putTodos(token, todo, '321321');

        const body = await response.json();
        expect(response.status()).toBe(400);
        expect(body.errorMessages[0]).toContain("Cannot create todo with PUT due to Auto fields id");
    });


    test("DELETE /todos/{id} (200)", {tag: '@API'}, async ({api}) => {

        const todo = new TodoBuilder()
            .addTitle()
            .addDescription()
            .addDoneStatus(false)
            .generate();


        const createResponse = await api.todos.postTodos(token, todo);
        const createdTodo = await createResponse.json();
        const todoId = createdTodo.id;
        const response = await api.todos.deleteTodos(token, todoId);
        
        expect(response.status()).toBe(200);
    });
    
});