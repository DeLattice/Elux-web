import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiButton, TuiIcon, TuiNotification, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiTooltip} from '@taiga-ui/kit';
import {TuiForm} from '@taiga-ui/layout';
import {DialogBackendService} from '../dialog-backend.service';
import {injectContext} from '@taiga-ui/polymorpheus';
import {Observer, Subscription} from 'rxjs';
import {TuiDialogContext} from '@taiga-ui/experimental';
import {SubsStateService} from '@app/pages/subs/subs.state';
import {
  FieldManagerService
} from '@app/pages/subs/components/manipulate-config-groups/dialogs/services/field-manager.service';

@Component({
  selector: 'app-dialog-add-group',
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
  templateUrl: './dialog-add-group.component.html',
  styleUrl: './dialog-add-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAddGroupComponent implements OnDestroy {
  public readonly context = injectContext<TuiDialogContext<void, string>>();

  private readonly _dialogBackendService = inject(DialogBackendService)
  private readonly _subsStateService = inject(SubsStateService)
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected createGroup() {
    const name = this.form.get('name')?.value;
    const configs = (this.form.get('payload')?.value as (string | null)[])
      .filter((config): config is string => typeof config === 'string' && config.trim() !== '')
      .map(config => config.trim());

    if (!name || configs.length === 0) return

    this._dialogBackendService.createGroup({
      name,
      configs
    }).subscribe({
      next: (data) => {
        this._subsStateService.addGroup({
          id: data.id,
          name: data.name,
          subUrl: data.subUrl
        });
        this.observer.complete();
      }
    });
  }
}
