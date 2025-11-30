import {inject, Injectable, Injector} from "@angular/core";
import {tuiDialog} from '@taiga-ui/core';
import {
  DialogAddGroupComponent
} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-add-group/dialog-add-group.component';
import {
  DialogEditGroupComponent
} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-edit-group/dialog-edit-group.component';
import {
  DialogDeleteGroupComponent
} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-delete-group/dialog-delete-group.component';
import {
  DialogRefreshGroupComponent
} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-refresh-group/dialog-refresh-group.component';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {
  DialogDeleteConfigComponent
} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-delete-config/dialog-delete-config.component';
import {TuiDialogService} from '@taiga-ui/experimental';
import {DialogBackendService} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-backend.service';
import {ConfigsListBusService} from '@app/pages/subs/components/configs-list/configs-list.bus.service';

@Injectable()
export class ManipulateConfigGroupsService {
  private readonly _dialogs = inject(TuiDialogService)
  private readonly _configsListBusService = inject(ConfigsListBusService)
  private readonly _dialogBackendService = inject(DialogBackendService)

  private readonly dialogAddGroup = tuiDialog(DialogAddGroupComponent, {
    dismissible: true,
    label: "Add group",
  });

  public showDialogAddGroup(): void {
    this.dialogAddGroup().subscribe(() =>
      this._configsListBusService.updateTrigger()
    );
  }

  private readonly dialogEditGroup = tuiDialog(DialogEditGroupComponent, {
    dismissible: true,
    label: "Edit group",
  });

  public showDialogEditGroup(): void {
    this.dialogEditGroup().subscribe(() =>
      this._configsListBusService.updateTrigger()
    );
  }

  private readonly dialogDeleteGroup = tuiDialog(DialogDeleteGroupComponent, {
    dismissible: true,
    label: "Are you sure?",
  });

  public showDialogDeleteGroup(): void {
    this.dialogDeleteGroup().subscribe(() =>
      this._configsListBusService.updateTrigger()
    );
  }

  private readonly dialogRefreshGroup = tuiDialog(DialogRefreshGroupComponent, {
    dismissible: true,
    label: "Are you sure?",
  });

  public showDialogRefreshGroup(): void {
    this.dialogRefreshGroup().subscribe(() =>
      this._configsListBusService.updateTrigger()
    );
  }

  private _inject = Injector.create({
    providers: [
      {
        provide: DialogBackendService,
        useValue: this._dialogBackendService
      }
    ],
  });

  public showDialogDeleteConfig(config: { id: number, name: string }): void {
    this._dialogs.open(new PolymorpheusComponent(DialogDeleteConfigComponent, this._inject), {
      data: {
        id: config.id,
        name: config.name
      }
    }).subscribe(() =>
      this._configsListBusService.updateTrigger()
    );
  }
}
