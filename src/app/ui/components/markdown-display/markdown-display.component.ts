import {Component, Input} from '@angular/core';
import {MarkdownComponent} from "ngx-markdown";
import {mermaidOptions} from "../../../config/markdown/mermaid.config";
import {katexOptions} from "../../../config/markdown/katex.config";

@Component({
  selector: 'app-markdown-display',
  standalone: true,
  imports: [
    MarkdownComponent,
  ],
  templateUrl: './markdown-display.component.html',
  styleUrl: './markdown-display.component.scss'
})
export class MarkdownDisplayComponent {
  @Input() content: string = "";
  @Input() renderMermaidManually: boolean = false;

  protected readonly mermaidOptions = mermaidOptions;
  protected readonly katexOptions = katexOptions;
}
