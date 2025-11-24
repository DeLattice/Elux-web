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
  selector: 'app-dialog-add-group',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiButton,
    TuiForm,
    TuiHeader,
  ],
  templateUrl: './dialog-refresh-group.component.html',
  styleUrl: './dialog-refresh-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogRefreshGroupComponent {
  public readonly context = injectContext<TuiDialogContext<void, string>>();

  private readonly _dialogBackendService = inject(DialogBackendService)
  private readonly _subsStateService = inject(SubsStateService)
  private readonly _observer: Observer<void> = this.context.$implicit;

  protected readonly selectedGroup = this._subsStateService.activeGroup

  protected refreshGroup() {
    const group = this._subsStateService.activeGroup()

    if (!group) return

    alert('TODO! refresh')

    this._dialogBackendService.refreshGroup(group.id).subscribe({
      next: data => {
        console.log(data)
      },
      complete: () => {
        this._observer.complete();
      }
    })
  }

  protected cancel() {
    this._observer.complete();
  }
}
