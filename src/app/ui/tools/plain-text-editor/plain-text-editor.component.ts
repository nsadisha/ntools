import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NzInputDirective, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {ApplicationConfig} from "../../../config/application.config";
import {LocalStorageService} from "../../../service/local-storage/local-storage.service";
import {LocalStorageKeys} from "../../../service/local-storage/local-storage-keys";

@Component({
  selector: 'app-plain-text-editor',
  standalone: true,
  imports: [
    NzTextareaCountComponent,
    ReactiveFormsModule,
    NzInputDirective,
    NzIconModule
  ],
  templateUrl: './plain-text-editor.component.html',
  styleUrl: './plain-text-editor.component.scss'
})
export class PlainTextEditorComponent {
  private typingTimer: any;
  private storageKey = LocalStorageKeys.PLAIN_TEXT_EDITOR_KEY;
  protected text = new FormControl('');

  constructor(private localStorageService: LocalStorageService) {
    this.text.setValue(localStorageService.getItem(this.storageKey));
  }

  onKeyUp() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.localStorageService.setItem(this.storageKey, this.text.value || '');
    }, ApplicationConfig.TYPING_TIMEOUT);
  }
}
