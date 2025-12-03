import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiAlertService, TuiButton, TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {TuiTooltip} from '@taiga-ui/kit';
import {TuiForm} from '@taiga-ui/layout';
import {DialogBackendService} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-backend.service';
import {injectContext} from '@taiga-ui/polymorpheus';
import {TuiDialogContext} from '@taiga-ui/experimental';
import {SubsGroupStateService} from '@app/pages/subs/subs.group.state';
import {Observer, Subscription} from 'rxjs';
import {urlValidator} from '@constructor/common/utils/validators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dialog-edit-group',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    FormsModule,
    TuiIcon,
    TuiTooltip,
    TuiButton,
    TuiForm,
  ],
  templateUrl: './dialog-edit-group.component.html',
  styleUrl: './dialog-edit-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogEditGroupComponent {
  public readonly context = injectContext<TuiDialogContext<void, string>>();

  private readonly _dialogBackendService = inject(DialogBackendService)
  private readonly _subsStateService = inject(SubsGroupStateService)
  private readonly _alerts = inject(TuiAlertService)
  private readonly observer: Observer<void> = this.context.$implicit;

  private readonly subscriptions = new Subscription();

  protected readonly group = this._subsStateService.activeGroup()!;

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    subscribeUrl: new FormControl('', {validators: [urlValidator]}),
  });

  constructor() {
    this.form.patchValue({
      name: this.group.name,
      subscribeUrl: this.group.subscribeUrl ? this.group.subscribeUrl.toString() : undefined,
    }, {emitEvent: false})
  }

  onSubmit() {
    const name = this.form.get('name')?.value!;
    const subUrl = this.form.get('subscribeUrl')?.value;

    const subscribeUrl = subUrl ? new URL(subUrl) : undefined

    this._dialogBackendService.updateGroup(this.group.id, {
      name, subscribeUrl,
    })
      .subscribe(
        {
          next: group => {
            this._subsStateService.updateGroup({
              id: this.group.id, name, subscribeUrl
            });

            this.observer.complete()
          },
          error: (err: HttpErrorResponse) => {
            this._alerts.open(err.message, {data: err, appearance: "error"}).subscribe()
          }
        }
      )
  }

  cancel() {
    this.observer.complete()
  }
}
