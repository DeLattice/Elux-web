import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiButton} from '@taiga-ui/core';
import {TuiForm, TuiHeader} from '@taiga-ui/layout';
import {DialogBackendService} from '../dialog-backend.service';
import {injectContext} from '@taiga-ui/polymorpheus';
import {Observer} from 'rxjs';
import {TuiDialogContext} from '@taiga-ui/experimental';
import {SubsStateService} from '@app/pages/subs/subs.state';

@Component({
  selector: 'app-dialog-delete-group',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiButton,
    TuiForm,
    TuiHeader,
  ],
  templateUrl: './dialog-delete-group.component.html',
  styleUrl: './dialog-delete-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDeleteGroupComponent {
  public readonly context = injectContext<TuiDialogContext<void, string>>();

  private readonly _dialogBackendService = inject(DialogBackendService)
  private readonly _subsStateService = inject(SubsStateService)
  private readonly _observer: Observer<void> = this.context.$implicit;

  protected readonly selectedGroup = this._subsStateService.activeGroup

  protected deleteGroup() {
    const group = this.selectedGroup()

    if (!group) return

    this._dialogBackendService.deleteGroup(group.id).subscribe({
      complete: () => {
        this._subsStateService.removeGroup(group)
        this._observer.complete();
      }
    })
  }

  protected cancel() {
    this._observer.complete();
  }
}
