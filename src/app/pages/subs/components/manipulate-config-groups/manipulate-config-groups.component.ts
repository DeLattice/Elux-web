import {ChangeDetectionStrategy, Component} from "@angular/core";
import {TuiButton, tuiDialog, TuiIcon} from "@taiga-ui/core";
import {DialogAddGroupComponent} from "./dialogs/dialog-add-group/dialog-add-group.component";
import {GroupsSelectComponent} from "./groups-select/groups-select.component";
import {DialogEditGroupComponent} from "./dialogs/dialog-edit-group/dialog-edit-group.component";
import {DialogBackendService} from "./dialogs/dialog-backend.service";
import {
  DialogDeleteGroupComponent
} from "@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-delete-group/dialog-delete-group.component";
import {
  DialogRefreshGroupComponent
} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-refresh-group/dialog-refresh-group.component';

@Component({
  selector: "app-manipulate-config-groups",
  imports: [TuiIcon, TuiButton, GroupsSelectComponent],
  templateUrl: "./manipulate-config-groups.component.html",
  styleUrl: "./manipulate-config-groups.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogBackendService],
})
export class ManipulateConfigGroupsComponent {
  private readonly dialogAddGroup = tuiDialog(DialogAddGroupComponent, {
    dismissible: true,
    label: "Add group",
  });

  protected showDialogAddGroup(): void {
    this.dialogAddGroup().subscribe();
  }

  private readonly dialogEditGroup = tuiDialog(DialogEditGroupComponent, {
    dismissible: true,
    label: "Edit group",
  });

  protected showDialogEditGroup(): void {
    this.dialogEditGroup().subscribe();
  }

  private readonly dialogDeleteGroup = tuiDialog(DialogDeleteGroupComponent, {
    dismissible: true,
    label: "Are you sure?",
  });

  protected showDialogDeleteGroup(): void {
    this.dialogDeleteGroup().subscribe();
  }

  private readonly dialogRefreshGroup = tuiDialog(DialogRefreshGroupComponent, {
    dismissible: true,
    label: "Are you sure?",
  });

  protected showDialogRefreshGroup(): void {
    this.dialogRefreshGroup().subscribe();
  }
}
