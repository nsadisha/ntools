import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageKeys } from '../local-storage/local-storage-keys';

describe('ThemeService', () => {
  let mediaQueryList: {
    matches: boolean;
    addEventListener: jasmine.Spy;
    removeEventListener: jasmine.Spy;
  };
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    mediaQueryList = {
      matches: false,
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
    };
    spyOn(window, 'matchMedia').and.returnValue(mediaQueryList as unknown as MediaQueryList);

    localStorageSpy = jasmine.createSpyObj<LocalStorageService>('LocalStorageService', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
  });

  function createService(storedMode: string): ThemeService {
    localStorageSpy.getItem.and.returnValue(storedMode);
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useValue: localStorageSpy }],
    });
    return TestBed.inject(ThemeService);
  }

  describe('readStoredMode (via construction)', () => {
    it('should adopt a stored "light" mode', () => {
      expect(createService('light').mode()).toBe('light');
    });

    it('should adopt a stored "dark" mode', () => {
      expect(createService('dark').mode()).toBe('dark');
    });

    it('should adopt a stored "system" mode', () => {
      expect(createService('system').mode()).toBe('system');
    });

    it('should fall back to "system" for an unrecognized stored value', () => {
      expect(createService('garbage').mode()).toBe('system');
    });
  });

  describe('resolvedTheme', () => {
    it('should resolve to "dark" when mode is "system" and the OS prefers dark', () => {
      mediaQueryList.matches = true;
      expect(createService('system').resolvedTheme()).toBe('dark');
    });

    it('should resolve to "light" when mode is "system" and the OS prefers light', () => {
      mediaQueryList.matches = false;
      expect(createService('system').resolvedTheme()).toBe('light');
    });

    it('should resolve to the explicit mode regardless of OS preference', () => {
      mediaQueryList.matches = true;
      expect(createService('light').resolvedTheme()).toBe('light');
    });
  });

  describe('setMode / toggle', () => {
    it('should update the mode signal and persist it to local storage', () => {
      const service = createService('light');

      service.setMode('dark');

      expect(service.mode()).toBe('dark');
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(LocalStorageKeys.THEME_MODE, 'dark');
    });

    it('should toggle from dark to light', () => {
      const service = createService('dark');

      service.toggle();

      expect(service.resolvedTheme()).toBe('light');
    });

    it('should toggle from light to dark', () => {
      const service = createService('light');

      service.toggle();

      expect(service.resolvedTheme()).toBe('dark');
    });
  });

  describe('effect', () => {
    it('should reflect the resolved theme onto the document element', () => {
      const service = createService('dark');
      TestBed.flushEffects();

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

      service.setMode('light');
      TestBed.flushEffects();

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('system preference change', () => {
    it('should update systemPrefersDark when the OS preference changes while in system mode', () => {
      const service = createService('system');
      const changeHandler = mediaQueryList.addEventListener.calls.mostRecent().args[1];

      changeHandler({ matches: true });

      expect(service.resolvedTheme()).toBe('dark');
    });
  });
});
