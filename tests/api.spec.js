import {expect} from "@playwright/test";
import {test} from "../src/fixtures/fixture";

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

        const todo = {
            title: "text",
            doneStatus: false,
            description: "text text"
        };


        const response = await api.todos.postTodos(token, todo);

        const body = await response.json();
        expect(response.status()).toBe(201);
        expect(response.headers()).toEqual(expect.objectContaining({"x-challenger": token}));
        expect(body.doneStatus).toEqual(false);
        expect(body.title).toBe("text");
        expect(body.description).toBe("text text");
    });


    test("POST /todos (400) title too long", {tag: '@API'}, async ({api}) => {

        const todo = {
            title: "texttexttexttexttexttexttexttexttexttexttexttexttexttext",
            doneStatus: false,
            description: "text"
        };


        const response = await api.todos.postTodos(token, todo);

        const body = await response.json();
        expect(response.status()).toBe(400);
        expect(body.errorMessages[0]).toContain("Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50");
    });


    test("PUT /todos/{id} ", {tag: '@API'}, async ({api}) => {

        const todo = {
            doneStatus: true,
            description: "text",
        };


        const response = await api.todos.putTodos(token, todo, '321321');

        const body = await response.json();
        expect(response.status()).toBe(400);
        expect(body.errorMessages[0]).toContain("Cannot create todo with PUT due to Auto fields id");
    });


    test("DELETE /todos/{id} (200)", {tag: '@API'}, async ({api}) => {

        const newTodo = {
        title: "To Delete",
        doneStatus: false,
        description: "Will be deleted"
    };
        const createResponse = await api.todos.postTodos(token, newTodo);
        const createdTodo = await createResponse.json();
        const todoId = createdTodo.id;
        const response = await api.todos.deleteTodos(token, todoId);
        
        expect(response.status()).toBe(200);
    });
});