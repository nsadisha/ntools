import { Injectable } from '@angular/core';
import {ModalOptions, NzModalService} from "ng-zorro-antd/modal";

@Injectable({
  providedIn: 'root',
})
export class PopupService {

  constructor(private modal: NzModalService) { }

  createComponentModal<T, D>(config: ModalOptions) {
    return this.modal.create<T, D>({
      ...config,
      nzOkText: config.nzOkText || 'Close',
      nzCancelText: config.nzCancelText?.length ? config.nzCancelText : null,
    });
  }
}
