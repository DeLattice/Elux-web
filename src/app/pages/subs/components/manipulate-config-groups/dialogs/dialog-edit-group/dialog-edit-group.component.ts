import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiButton, TuiIcon, TuiNotification, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiTooltip} from '@taiga-ui/kit';
import {TuiForm} from '@taiga-ui/layout';
import {DialogBackendService} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-backend.service';
import {injectContext} from '@taiga-ui/polymorpheus';
import {TuiDialogContext} from '@taiga-ui/experimental';
import {SubsGroupStateService} from '@app/pages/subs/subs.group.state';
import {
  FieldManagerService
} from '@app/pages/subs/components/manipulate-config-groups/dialogs/services/field-manager.service';
import {Observer, Subscription} from 'rxjs';

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
    TuiNotification,
    TuiTitle,
  ],
  templateUrl: './dialog-edit-group.component.html',
  styleUrl: './dialog-edit-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogEditGroupComponent {
  public readonly context = injectContext<TuiDialogContext<void, string>>();

  private readonly _dialogBackendService = inject(DialogBackendService)
  private readonly _subsStateService = inject(SubsGroupStateService)
  private readonly _fieldManagerService = inject(FieldManagerService)
  private readonly observer: Observer<void> = this.context.$implicit;

  private readonly subscriptions = new Subscription();

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    subUrl: new FormControl(''),
    payload: new FormArray([
      new FormControl('', [Validators.required]),
    ], Validators.required),
  });

  protected get payload() {
    return this.form.controls.payload
  }

  constructor() {
    this.subscriptions.add(
      this.payload.valueChanges.subscribe(() => {
        this._fieldManagerService.checkAndAddEmptyField(this.payload);
      })
    );
  }

  protected onFieldBlur(index: number): void {
    const control = this.payload.at(index);
    if (!control) return;

    const value = control.value?.trim();

    if (!value) {
      if (this.payload.length > 1) {
        this.payload.removeAt(index);
      }
    }

    this._fieldManagerService.checkAndAddEmptyField(this.payload);
  }
}
