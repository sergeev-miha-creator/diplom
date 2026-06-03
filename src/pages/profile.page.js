import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
        
        // Элементы профиля
        this.userProfile = page.locator('.user-pic');
        this.linkProfile = page.getByRole('link', { name: ' Profile' });
        this.favoriteTab = page.getByRole('link', { name: 'Favorited Articles' });
        this.myTab = page.getByRole('link', { name: 'My Articles' });
        this.myTabContent = page.getByRole('link', { name: 'My Articles' });
        this.favoriteTabContent = page.getByRole('link', { name: 'Favorited Articles' });
    }

    async goToMyTab() {
        await this.userProfile.click();
        await this.linkProfile.click();
        await this.myTab.click();
    }

    async goToFavoriteTab() {
        await this.userProfile.click();
        await this.linkProfile.click();
        await this.favoriteTab.click();
    }

    async verifyMyTabVisible() {
        await expect(this.myTab).toBeVisible();
    }

    async verifyFavoriteTabVisible() {
        await expect(this.favoriteTab).toBeVisible();
    }
}