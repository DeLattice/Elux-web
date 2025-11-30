import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiAlertService, TuiButton, TuiLoader} from '@taiga-ui/core';
import {TuiForm, TuiHeader} from '@taiga-ui/layout';
import {DialogBackendService} from '../dialog-backend.service';
import {injectContext} from '@taiga-ui/polymorpheus';
import {finalize, Observer} from 'rxjs';
import {TuiDialogContext} from '@taiga-ui/experimental';
import {SubsGroupStateService} from '@app/pages/subs/subs.group.state';

@Component({
  selector: 'app-dialog-add-group',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiButton,
    TuiForm,
    TuiHeader,
    TuiLoader,
  ],
  templateUrl: './dialog-refresh-group.component.html',
  styleUrl: './dialog-refresh-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogRefreshGroupComponent {
  public readonly context = injectContext<TuiDialogContext<void, string>>();

  private readonly _dialogBackendService = inject(DialogBackendService)
  private readonly _subsStateService = inject(SubsGroupStateService)
  private readonly _alertService = inject(TuiAlertService)
  private readonly _observer: Observer<void> = this.context.$implicit;

  protected readonly selectedGroup = this._subsStateService.activeGroup
  protected readonly isLoading = signal<boolean>(false)

  protected refreshGroup() {
    const group = this.selectedGroup()

    if (!group) return

    this.isLoading.set(true)

    this._dialogBackendService.refreshGroup(group.id)
      .pipe(
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        complete: () => {
          this._alertService.open(`The <strong>${group.name}</strong> group has been successfully updated.`, {appearance: "success"}).subscribe()

          this._observer.next();
          this._observer.complete();
        },
        error: err => this._alertService.open(err, {appearance: "error"}).subscribe()
      })
  }

  protected cancel() {
    this._observer.complete();
  }
}
