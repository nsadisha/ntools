import { PopupService } from './popup.service';
import { NzModalService } from 'ng-zorro-antd/modal';

describe('PopupService', () => {
  let service: PopupService;
  let modalSpy: jasmine.SpyObj<NzModalService>;

  beforeEach(() => {
    modalSpy = jasmine.createSpyObj<NzModalService>('NzModalService', ['create']);
    service = new PopupService(modalSpy);
  });

  it('should default the OK text when none is supplied', () => {
    service.createComponentModal({});

    expect(modalSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({ nzOkText: 'Close' })
    );
  });

  it('should use a supplied OK text', () => {
    service.createComponentModal({ nzOkText: 'Save' });

    expect(modalSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({ nzOkText: 'Save' })
    );
  });

  it('should null out the cancel text when none is supplied', () => {
    service.createComponentModal({});

    expect(modalSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({ nzCancelText: null })
    );
  });

  it('should null out an empty cancel text', () => {
    service.createComponentModal({ nzCancelText: '' });

    expect(modalSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({ nzCancelText: null })
    );
  });

  it('should use a supplied cancel text', () => {
    service.createComponentModal({ nzCancelText: 'Dismiss' });

    expect(modalSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({ nzCancelText: 'Dismiss' })
    );
  });
});
