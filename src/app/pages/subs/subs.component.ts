import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ConfigsListComponent } from "./components/configs-list/configs-list.component";
import { ManipulateConfigGroupsComponent } from "./components/manipulate-config-groups/manipulate-config-groups.component";
import { XrayStateService } from "@app/services/xray-state.service";
import {AsyncPipe} from '@angular/common';

@Component({
  selector: "app-subs",
  imports: [ConfigsListComponent, ManipulateConfigGroupsComponent, AsyncPipe],
  templateUrl: "./subs.component.html",
  styleUrl: "./subs.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubsComponent {
  public readonly xrayStateService = inject(XrayStateService);
}
