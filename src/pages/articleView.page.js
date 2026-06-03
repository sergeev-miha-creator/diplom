import { BasePage } from './base.page';
import { expect } from '@playwright/test';

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

    async verifyArticleTitle(expectedTitle) {
        await expect(this.articleTitle).toContainText(expectedTitle);
    }

    async verifyArticleBody(expectedBody) {
        await expect(this.articleBody).toContainText(expectedBody);
    }

    async verifyArticleTags(expectedTags) {
        // Если expectedTags - массив, проверяем каждый тег
        if (Array.isArray(expectedTags)) {
            for (const tag of expectedTags) {
                await expect(this.articleTags).toContainText(tag);
            }
        } else {
            await expect(this.articleTags).toContainText(expectedTags);
        }
    }

    async addComment(comment) {
        const { commentText } = comment;
        await this.writeComment.click();
        await this.writeComment.fill(commentText);
        await this.postComment.click();
    }

    async verifyComment(expectedComment) {
        await expect(this.articleComment).toContainText(expectedComment.commentText);
    }
}