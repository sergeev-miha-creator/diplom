import { ChallengerService, TodosService } from './index';

export class ApiClient {
    constructor (options) {
        const defaultOptions = {
            URL: "https://apichallenges.eviltester.com/",
        }
        const mergeOptions = {
            ...defaultOptions,
            ...options,
        }
        this.challenger = new ChallengerService(mergeOptions);
        this.todos = new TodosService(mergeOptions);
    };

    static async loginAs(){
        const client = this.unauthorized();
        const { headers } = await client.challenger.post();
        const token = headers["x-challenger"]


        return new ApiClient({token});
    }

    static unauthorized(){
        return new ApiClient();
    }
}