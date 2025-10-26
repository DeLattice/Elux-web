import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ConfigsListComponent } from "./components/configs-list/configs-list.component";
import { ManipulateConfigGroupsComponent } from "./components/manipulate-config-groups/manipulate-config-groups.component";

@Component({
  selector: "app-subs",
  imports: [ConfigsListComponent, ManipulateConfigGroupsComponent],
  templateUrl: "./subs.component.html",
  styleUrl: "./subs.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubsComponent {}
