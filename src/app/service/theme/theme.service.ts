import { Injectable, computed, effect, signal } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageKeys } from '../local-storage/local-storage-keys';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly media = window.matchMedia('(prefers-color-scheme: dark)');
  private readonly systemPrefersDark = signal(this.media.matches);

  readonly mode = signal<ThemeMode>('system');

  readonly resolvedTheme = computed<ResolvedTheme>(() => {
    const mode = this.mode();
    return mode === 'system' ? (this.systemPrefersDark() ? 'dark' : 'light') : mode;
  });

  constructor(private localStorage: LocalStorageService) {
    this.mode.set(this.readStoredMode());

    this.media.addEventListener('change', event => this.systemPrefersDark.set(event.matches));

    // Side-effect only (no signal writes here, to avoid NG0600): reflect the
    // resolved theme onto <html> so every var(--token) reference re-resolves.
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.resolvedTheme());
    });
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
    this.localStorage.setItem(LocalStorageKeys.THEME_MODE, mode);
  }

  /** Explicit user-facing toggle: flips between light and dark. */
  toggle(): void {
    this.setMode(this.resolvedTheme() === 'dark' ? 'light' : 'dark');
  }

  private readStoredMode(): ThemeMode {
    const stored = this.localStorage.getItem(LocalStorageKeys.THEME_MODE);
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  }
}
