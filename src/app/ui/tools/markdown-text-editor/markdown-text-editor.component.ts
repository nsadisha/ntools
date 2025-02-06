import { Component } from '@angular/core';
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {MarkdownDisplayComponent} from "../../components/markdown-display/markdown-display.component";
import {LocalStorageKeys} from "../../../service/local-storage/local-storage-keys";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LocalStorageService} from "../../../service/local-storage/local-storage.service";
import {ApplicationConfig} from "../../../config/application.config";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzResizableDirective} from "ng-zorro-antd/resizable";

@Component({
  selector: 'app-markdown-text-editor',
  standalone: true,
  imports: [
    NzTabSetComponent,
    NzTabComponent,
    MarkdownDisplayComponent,
    FormsModule,
    NzIconDirective,
    NzInputDirective,
    ReactiveFormsModule,
    NzResizableDirective
  ],
  templateUrl: './markdown-text-editor.component.html',
  styleUrl: './markdown-text-editor.component.scss'
})
export class MarkdownTextEditorComponent {
  private typingTimer: any;
  private storageKey = LocalStorageKeys.MARKDOWN_EDITOR_KEY;
  protected currentTabIndex = 0;
  protected markdown = new FormControl('');

  constructor(private localStorageService: LocalStorageService) {
    this.markdown.setValue(this.localStorageService.getItem(this.storageKey));

  }

  onKeyUp() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.localStorageService.setItem(this.storageKey, this.markdown.value || '');
    }, ApplicationConfig.TYPING_TIMEOUT);
  }

  get markdownContent(): string {
    if(this.markdown.value == '') {
      return 'Start typing in the **Edit Content** tab to see the markdown preview.'
    }
    return this.markdown.value || '';
  }

  get renderMermaidManually() {
    return this.currentTabIndex != 0;
  }
}
