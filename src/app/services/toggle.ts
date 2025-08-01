import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Toggle {

  private themeKey = 'theme';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (this.isBrowser()) {
      const savedTheme = this.getSavedTheme();
      this.applyTheme(savedTheme);
    }
  }


  /** 🔹 თემის გადართვა */
  toggleTheme(): void {
    if (!this.isBrowser()) return;

    const currentTheme = this.getSavedTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.saveTheme(newTheme);
  }

  /** 🔹 თემის შენახვა localStorage-ში */
  private saveTheme(theme: string): void {
    if (!this.isBrowser()) return;

    localStorage.setItem(this.themeKey, theme);
    this.applyTheme(theme);
  }

  /** 🔹 use theme */
  private applyTheme(theme: string): void {
    if (!this.isBrowser()) return;

    // Bootstrap-ის data-bs-theme
    document.body.setAttribute('data-bs-theme', theme);

    // delete old theme and add new class
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
  }

  /** 🔹 get theme from localStorage */
  getSavedTheme(): string {
    return this.isLocalStorageAvailable() ? localStorage.getItem(this.themeKey) || 'light' : 'light';
  }

  /** 🔹 checking, if working or not working in browser */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /** 🔹 check of localStorage */
  private isLocalStorageAvailable(): boolean {
    if (!this.isBrowser()) return false;

    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

}
