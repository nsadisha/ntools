import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PlainTextEditorComponent } from './plain-text-editor.component';
import { overrideAsShallow } from '../../../testing/shallow';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';
import { LocalStorageKeys } from '../../../service/local-storage/local-storage-keys';
import { ApplicationConfig } from '../../../config/application.config';

describe('PlainTextEditorComponent', () => {
  let fixture: ComponentFixture<PlainTextEditorComponent>;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj<LocalStorageService>('LocalStorageService', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
    localStorageSpy.getItem.and.returnValue('stored text');

    overrideAsShallow(PlainTextEditorComponent);
    TestBed.configureTestingModule({
      imports: [PlainTextEditorComponent],
      providers: [{ provide: LocalStorageService, useValue: localStorageSpy }],
    });
    fixture = TestBed.createComponent(PlainTextEditorComponent);
    fixture.detectChanges();
  });

  it('should load the stored text on construction', () => {
    expect(localStorageSpy.getItem).toHaveBeenCalledWith(LocalStorageKeys.PLAIN_TEXT_EDITOR_KEY);
    expect(fixture.componentInstance['text'].value).toBe('stored text');
  });

  it('should persist the text after the typing timeout elapses', fakeAsync(() => {
    fixture.componentInstance['text'].setValue('new text');

    fixture.componentInstance.onKeyUp();
    tick(ApplicationConfig.TYPING_TIMEOUT);

    expect(localStorageSpy.setItem).toHaveBeenCalledWith(LocalStorageKeys.PLAIN_TEXT_EDITOR_KEY, 'new text');
  }));

  it('should debounce rapid keystrokes into a single save', fakeAsync(() => {
    fixture.componentInstance.onKeyUp();
    tick(ApplicationConfig.TYPING_TIMEOUT / 2);
    fixture.componentInstance.onKeyUp();
    tick(ApplicationConfig.TYPING_TIMEOUT);

    expect(localStorageSpy.setItem).toHaveBeenCalledTimes(1);
  }));

  it('should save an empty string when the text is cleared', fakeAsync(() => {
    fixture.componentInstance['text'].setValue(null);

    fixture.componentInstance.onKeyUp();
    tick(ApplicationConfig.TYPING_TIMEOUT);

    expect(localStorageSpy.setItem).toHaveBeenCalledWith(LocalStorageKeys.PLAIN_TEXT_EDITOR_KEY, '');
  }));
});
