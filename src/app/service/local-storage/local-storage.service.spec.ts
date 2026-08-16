import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeys } from './local-storage-keys';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    service = new LocalStorageService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should store and retrieve a value', () => {
    service.setItem(LocalStorageKeys.THEME_MODE, 'dark');
    expect(service.getItem(LocalStorageKeys.THEME_MODE)).toBe('dark');
  });

  it('should return an empty string when the key is absent', () => {
    expect(service.getItem(LocalStorageKeys.THEME_MODE)).toBe('');
  });

  it('should remove a stored value', () => {
    service.setItem(LocalStorageKeys.THEME_MODE, 'dark');
    service.removeItem(LocalStorageKeys.THEME_MODE);
    expect(service.getItem(LocalStorageKeys.THEME_MODE)).toBe('');
  });
});
