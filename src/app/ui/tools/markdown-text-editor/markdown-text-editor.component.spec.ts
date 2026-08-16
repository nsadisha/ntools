import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MarkdownTextEditorComponent } from './markdown-text-editor.component';
import { overrideAsShallow } from '../../../testing/shallow';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';
import { LocalStorageKeys } from '../../../service/local-storage/local-storage-keys';
import { ApplicationConfig } from '../../../config/application.config';

describe('MarkdownTextEditorComponent', () => {
  let fixture: ComponentFixture<MarkdownTextEditorComponent>;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj<LocalStorageService>('LocalStorageService', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
    localStorageSpy.getItem.and.returnValue('');

    overrideAsShallow(MarkdownTextEditorComponent);
    TestBed.configureTestingModule({
      imports: [MarkdownTextEditorComponent],
      providers: [{ provide: LocalStorageService, useValue: localStorageSpy }],
    });
    fixture = TestBed.createComponent(MarkdownTextEditorComponent);
    fixture.detectChanges();
  });

  it('should load the stored markdown on construction', () => {
    expect(localStorageSpy.getItem).toHaveBeenCalledWith(LocalStorageKeys.MARKDOWN_EDITOR_KEY);
  });

  it('should persist the markdown after the typing timeout elapses', fakeAsync(() => {
    fixture.componentInstance['markdown'].setValue('# Title');

    fixture.componentInstance.onKeyUp();
    tick(ApplicationConfig.TYPING_TIMEOUT);

    expect(localStorageSpy.setItem).toHaveBeenCalledWith(LocalStorageKeys.MARKDOWN_EDITOR_KEY, '# Title');
  }));

  it('should save an empty string when the markdown is cleared', fakeAsync(() => {
    fixture.componentInstance['markdown'].setValue(null);

    fixture.componentInstance.onKeyUp();
    tick(ApplicationConfig.TYPING_TIMEOUT);

    expect(localStorageSpy.setItem).toHaveBeenCalledWith(LocalStorageKeys.MARKDOWN_EDITOR_KEY, '');
  }));

  describe('markdownContent', () => {
    it('should show a placeholder message when the markdown is exactly empty', () => {
      fixture.componentInstance['markdown'].setValue('');
      expect(fixture.componentInstance.markdownContent).toBe(
        'Start typing in the **Edit Content** tab to see the markdown preview.'
      );
    });

    it('should return the raw markdown when non-empty', () => {
      fixture.componentInstance['markdown'].setValue('# Title');
      expect(fixture.componentInstance.markdownContent).toBe('# Title');
    });

    it('should fall back to an empty string when the value is null', () => {
      fixture.componentInstance['markdown'].setValue(null);
      expect(fixture.componentInstance.markdownContent).toBe('');
    });
  });

  describe('renderMermaidManually', () => {
    it('should be false on the first (edit) tab', () => {
      fixture.componentInstance['currentTabIndex'] = 0;
      expect(fixture.componentInstance.renderMermaidManually).toBe(false);
    });

    it('should be true on any other tab', () => {
      fixture.componentInstance['currentTabIndex'] = 1;
      expect(fixture.componentInstance.renderMermaidManually).toBe(true);
    });
  });
});
