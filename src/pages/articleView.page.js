import { BasePage } from './base.page';

export class ArticleViewPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Элементы просмотра статьи
        this.articleTitle = page.getByRole('heading');
        this.articleBody = page.getByRole('paragraph');
        this.articleTags = page.locator('.tag-list');
        
        // Элементы комментариев
        this.writeComment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.postComment = page.getByRole('button', { name: 'Post Comment' });
        this.articleComment = page.getByRole('main');
    }

    async addComment(comment) {
        const { commentText } = comment;
        await this.writeComment.click();
        await this.writeComment.fill(commentText);
        await this.postComment.click();
    }

}