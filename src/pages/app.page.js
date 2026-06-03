import { ArticleEditorPage, ArticleViewPage, ProfilePage,MainPage, RegisterPage } from './index';

export class App {
    constructor(page) {
        this.page = page;
        this.main = new MainPage(page);
        this.register = new RegisterPage(page);
        this.articleEditor = new ArticleEditorPage(page);
        this.articleView = new ArticleViewPage(page);
        this.profile = new ProfilePage(page);
    }
    
}