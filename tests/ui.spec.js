import { expect } from '@playwright/test';
import { UserBuilder } from '../src/builders/user.builder';
import { ArticleBuilder } from '../src/builders/article.builder';
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


        await app.register.register(user);
        await app.article.createNewArticle(article);
        await app.article.updateArticle(article);

        await expect(app.article.articleTitle).toContainText(article.title);
        await expect(app.article.articleBody).toContainText(article.body);
        await expect(app.article.articleTags).toContainText(article.tags);
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