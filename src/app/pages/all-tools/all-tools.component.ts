import {Component, OnInit} from '@angular/core';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzAutocompleteComponent, NzAutocompleteTriggerDirective} from "ng-zorro-antd/auto-complete";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {ToolDisplayCardComponent} from "../../components/tool-display-card/tool-display-card.component";
import {ToolService} from "../../service/tool/tool.service";
import {Tool} from "../../model/tool.model";
import {NzEmptyComponent} from "ng-zorro-antd/empty";

@Component({
  selector: 'app-all-tools',
  standalone: true,
  imports: [
    NzGridModule,
    NzInputDirective,
    FormsModule,
    NzAutocompleteTriggerDirective,
    NzAutocompleteComponent,
    NzIconDirective,
    NzInputGroupComponent,
    ToolDisplayCardComponent,
    NzEmptyComponent
  ],
  templateUrl: './all-tools.component.html',
  styleUrl: './all-tools.component.scss'
})
export class AllToolsComponent implements OnInit {
  private typingTimeout: any;
  protected inputValue: string = "";
  protected filteredToolNames: string[] = [];
  private toolNames: string[] = [];
  private inputTimeout = 500;

  protected tools: Tool[] = [];

  constructor(private toolService: ToolService) {}

  onChange(value: string): void {
    // Clear any existing timeout
    clearTimeout(this.typingTimeout);

    // Set a new timeout
    this.typingTimeout = setTimeout(() => {
      this.search(this.inputValue);
    }, this.inputTimeout);

    this.filteredToolNames = this.toolNames
      .filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  private search(value: string): void {
    this.tools = this.toolService.getAllToolsByName(value);
  }

  ngOnInit(): void {
    this.tools = this.toolService.getAllTools();
    this.toolNames = this.toolService.getToolNames();
  }

  clearSearch() {
    this.inputValue = "";
    this.tools = this.toolService.getAllTools();
  }
}
