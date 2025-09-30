import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import {
  TuiButton,
  tuiDialog,
  TuiDropdownService,
  TuiIcon,
} from "@taiga-ui/core";
import { DialogAddGroupComponent } from "./dialogs/dialog-add-group/dialog-add-group.component";
import { GroupsSelectComponent } from "./groups-select/groups-select.component";
import { DialogEditGroupComponent } from "./dialogs/dialog-edit-group/dialog-edit-group.component";
import { DialogBackendService } from "./dialogs/dialog-backend.service";

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

  private readonly dialogEditGroup = tuiDialog(DialogEditGroupComponent, {
    dismissible: true,
    label: "Edit group",
  });

  protected showDialogAddGroup(): void {
    this.dialogAddGroup().subscribe();
  }

  protected showDialogEditGroup(): void {
    this.dialogEditGroup().subscribe();
  }
}
