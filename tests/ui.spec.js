/*
import { expect } from '@playwright/test';
import { UserBuilder, ArticleBuilder } from '../src/builders';
import {test} from "../src/fixtures/fixture";

test.describe('Регистрация', () => {
    test.beforeEach(async ({ app }) => {

        await app.main.gotoRegister();
    });


    test('Create article',  { tag: '@UI' }, async ({app}) => {

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
        await app.article.createNewArticle(article);

        await expect(app.article.articleTitle).toContainText(article.title);
        await expect(app.article.articleBody).toContainText(article.body);

        await expect(app.article.articleTags).toContainText(article.tags);
    });

    test('Update article',{ tag: '@UI' },async ({app}) => {

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
        const updatedArticle = new ArticleBuilder()
        .addTitle()
        .addBody()
        .generate();

        await app.register.register(user);
        await app.article.createNewArticle(article);
        await app.article.updateArticle(updatedArticle);

        await expect(app.article.articleTitle).toContainText(updatedArticle.title);
        await expect(app.article.articleBody).toContainText(updatedArticle.body);
    });

    test('Add comment',{ tag: '@UI' }, async ({app}) => {

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
        await app.article.createNewArticle(article);
        await app.article.newPostComment(comment);

        await expect(app.article.articleComment).toContainText(comment.commentText);
    });

    test('Open my article tab ', { tag: '@UI' },async ({app}) => {

        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();


        await app.register.register(user);
        await app.article.goToMyTab();

        await expect(app.article.myTab).toBeVisible();
    });

    test('Open favorited article tab',{ tag: '@UI' }, async ({app}) => {

        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        await app.register.register(user);
        await app.article.goToFavoriteTab();

        await expect(app.article.favoriteTab).toBeVisible();
    });
});
*/
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

        // Проверяем через страницу просмотра
        await app.articleView.verifyArticleTitle(article.title);
        await app.articleView.verifyArticleBody(article.body);
        
        // Проверяем теги (если они есть)
        if (article.tags) {
            await app.articleView.verifyArticleTags(article.tags);
        }
    });

    test('Update article', { tag: '@UI' }, async ({ app }) => {
        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        // Исходная статья с конкретными значениями
        const originalArticle = new ArticleBuilder()
            .addTitle('Original Title For Update Test')
            .addDescription('Original Description')
            .addBody('Original Body Content')
            .addTags(['original-tag'])
            .generate();

        // Новые данные для обновления (отличающиеся)
        const updatedArticle = new ArticleBuilder()
            .addTitle('Updated Title!!!')
            .addBody('Updated Body Content!!!')
            .generate();

        await app.register.register(user);
        
        // Создаём статью
        await app.articleEditor.createNewArticle(originalArticle);
        
        // Проверяем, что оригинальная статья отображается
        await app.articleView.verifyArticleTitle(originalArticle.title);
        await app.articleView.verifyArticleBody(originalArticle.body);
        
        // Обновляем статью
        await app.articleEditor.updateArticle(updatedArticle);
        
        // Проверяем, что отображаются ОБНОВЛЁННЫЕ данные
        await app.articleView.verifyArticleTitle(updatedArticle.title);
        await app.articleView.verifyArticleBody(updatedArticle.body);
        
        // Проверяем, что старые данные исчезли (опционально)
        await expect(app.articleView.articleTitle).not.toContainText(originalArticle.title);
        await expect(app.articleView.articleBody).not.toContainText(originalArticle.body);
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
        await app.articleView.verifyComment(comment);
    });

    test('Open my article tab', { tag: '@UI' }, async ({ app }) => {
        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        await app.register.register(user);
        await app.profile.goToMyTab();
        await app.profile.verifyMyTabVisible();
    });

    test('Open favorited article tab', { tag: '@UI' }, async ({ app }) => {
        const user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        await app.register.register(user);
        await app.profile.goToFavoriteTab();
        await app.profile.verifyFavoriteTabVisible();
    });
});