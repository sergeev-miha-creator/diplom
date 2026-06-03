import { BasePage } from './base.page';

export class ArticleEditorPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Элементы редактора
        this.newArticle = page.getByRole('link', { name: ' New Article' });
        this.chooseTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.chooseDescription = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.chooseBody = page.getByRole('textbox', { name: 'Write your article (in' });
        this.chooseTags = page.getByRole('textbox', { name: 'Enter tags' });
        this.articlePublish = page.getByText('Publish Article');
        this.articleUpdate = page.getByRole('button', { name: 'Update Article' });
        this.editArticle = page.getByRole('link', { name: ' Edit Article' });
    }

    async createNewArticle(article) {
        const { title, description, body, tags } = article;
        await this.newArticle.click();
        await this.chooseTitle.click();
        await this.chooseTitle.fill(title);
        await this.chooseDescription.click();
        await this.chooseDescription.fill(description);
        await this.chooseBody.click();
        await this.chooseBody.fill(body);
        await this.chooseTags.click();
        await this.chooseTags.fill(tags);
        await this.articlePublish.click();
    }

    async updateArticle(article) {
        const { title, body } = article;
        await this.editArticle.nth(1).click();
        await this.chooseTitle.click();
        await this.chooseTitle.clear();
        await this.chooseTitle.fill(title);
        await this.chooseBody.click();
        await this.chooseBody.clear();
        await this.chooseBody.fill(body);
        await this.articleUpdate.click();
    }

    async goToEditor() {
        await this.newArticle.click();
    }
}