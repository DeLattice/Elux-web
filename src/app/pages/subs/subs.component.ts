import {ChangeDetectionStrategy, Component} from "@angular/core";
import {ConfigsListComponent} from "./components/configs-list/configs-list.component";
import {
  ManipulateConfigGroupsComponent
} from "./components/manipulate-config-groups/manipulate-config-groups.component";
import {
  ManipulateConfigGroupsService
} from '@app/pages/subs/components/manipulate-config-groups/manipulate-config-groups.service';
import {DialogBackendService} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-backend.service';

@Component({
  selector: "app-subs",
  imports: [ConfigsListComponent, ManipulateConfigGroupsComponent],
  templateUrl: "./subs.component.html",
  styleUrl: "./subs.component.scss",
  providers: [DialogBackendService, ManipulateConfigGroupsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubsComponent {
}
