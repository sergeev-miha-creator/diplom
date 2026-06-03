import { ChallengerService } from './challenger.service';
import { TodosService } from './todos.service';

export class ApiClient {
    constructor(request, baseURL) {
        this.request = request;
        this.baseURL = baseURL;
        this.challenger = new ChallengerService(request, baseURL);
        this.todos = new TodosService(request, baseURL);
    }

    static async loginAs(request, baseURL) {

        const client = this.unauthorized();
        const response = await client.challenger.post();
        const headers = response.headers();
        const token = headers["x-challenger"];
        return new ApiClient({ token });

    }

    getToken() {
        return this.token;
    }
}