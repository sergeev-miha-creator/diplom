import { expect } from '@playwright/test';
import { UserBuilder, ArticleBuilder } from '../src/builders';
import { test } from "../src/fixtures/fixture";

test.describe('Регистрация', () => {
    test.beforeEach(async ({ app }) => {
        await app.main.gotoRegister();
    });

    test('Create article', { tag: '@UI' }, async ({ app }) => {
        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        const article = new ArticleBuilder()
            .addTitle()
            .addDescription()
            .addBody()
            .addTags()
            .generate();

        await app.register.register(user);
        await app.articleEditor.createNewArticle(article);

        await expect(app.articleView.articleTitle).toContainText(article.title);
        await expect(app.articleView.articleBody).toContainText(article.body);
        await expect(app.articleView.articleTags).toContainText(article.tags);
            
    });

    test('Update article', { tag: '@UI' }, async ({ app }) => {
        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        const originalArticle = new ArticleBuilder()
            .addTitle('Original Title For Update Test')
            .addDescription('Original Description')
            .addBody('Original Body Content')
            .addTags(['original-tag'])
            .generate();

        const updatedArticle = new ArticleBuilder()
            .addTitle('Updated Title!!!')
            .addBody('Updated Body Content!!!')
            .generate();

        await app.register.register(user);
        await app.articleEditor.createNewArticle(originalArticle);

        await expect(app.articleView.articleTitle).toContainText(originalArticle.title);
        await expect(app.articleView.articleBody).toContainText(originalArticle.body);
        
        await app.articleEditor.updateArticle(updatedArticle);
        
        await expect(app.articleView.articleTitle).toContainText(updatedArticle.title);
        await expect(app.articleView.articleBody).toContainText(updatedArticle.body);
    });

    test('Add comment', { tag: '@UI' }, async ({ app }) => {
        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        const article = new ArticleBuilder()
            .addTitle()
            .addDescription()
            .addBody()
            .addTags()
            .generate();

        const comment = new ArticleBuilder()
            .addText()
            .generate();

        await app.register.register(user);
        await app.articleEditor.createNewArticle(article);
        await app.articleView.addComment(comment);

        await expect(app.articleView.articleComment).toContainText(comment.commentText);
    });

    test('Open my article tab', { tag: '@UI' }, async ({ app }) => {
        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        await app.register.register(user);
        await app.profile.goToMyTab();
        
         await expect(app.profile.myTab).toBeVisible();
    });

    test('Open favorited article tab', { tag: '@UI' }, async ({ app }) => {
        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        await app.register.register(user);
        await app.profile.goToFavoriteTab();
        
        await expect(app.profile.favoriteTab).toBeVisible();
    });
});