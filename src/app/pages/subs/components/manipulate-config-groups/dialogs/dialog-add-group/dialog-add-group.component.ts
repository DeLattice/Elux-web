import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiAlertService, TuiButton, TuiIcon, TuiLoader, TuiNotification, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiTooltip} from '@taiga-ui/kit';
import {TuiForm} from '@taiga-ui/layout';
import {DialogBackendService} from '../dialog-backend.service';
import {injectContext} from '@taiga-ui/polymorpheus';
import {EMPTY, Observer, of, Subscription, switchMap, tap} from 'rxjs';
import {TuiDialogContext} from '@taiga-ui/experimental';
import {SubsGroupStateService} from '@app/pages/subs/subs.group.state';
import {
  FieldManagerService
} from '@app/pages/subs/components/manipulate-config-groups/dialogs/services/field-manager.service';
import {urlValidator} from '@constructor/common/utils/validators';
import {HttpErrorResponse} from '@angular/common/http';
import {SubsConfigsStateService} from '@app/pages/subs/subs.configs.state';
import {GroupRdo} from '@app/pages/subs/model/rdo/group.rdo';

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
    TuiLoader,
  ],
  templateUrl: './dialog-add-group.component.html',
  styleUrl: './dialog-add-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAddGroupComponent implements OnDestroy {
  public readonly context = injectContext<TuiDialogContext<void, string>>();

  private readonly _dialogBackendService = inject(DialogBackendService)
  private readonly _subsGroupStateService = inject(SubsGroupStateService)
  private readonly _subsConfigsStateService = inject(SubsConfigsStateService)
  private readonly _alerts = inject(TuiAlertService);
  private readonly _fieldManagerService = inject(FieldManagerService)
  private readonly observer: Observer<void> = this.context.$implicit;

  private readonly subscriptions = new Subscription();

  protected isLoading = signal<boolean>(false);

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    subscribeUrl: new FormControl<string>('', {validators: [urlValidator]}),
    payload: new FormArray([
      new FormControl<string>('https://raw.githubusercontent.com/Epodonios/v2ray-configs/refs/heads/main/Sub1.txt'),
    ]),
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
    this.isLoading.set(true);

    const name = this.form.get('name')?.value!;
    const subUrl = this.form.get('subscribeUrl')?.value;
    const configs = this.form.get('payload')?.value
      .filter((config): config is string => typeof config === 'string' && config.trim() !== '')
      .map(config => config.trim());

    const subscribeUrl = subUrl ? new URL(subUrl) : undefined

    const addGroup = (data: GroupRdo) => {
      this._subsGroupStateService.addGroup({
        id: data.id,
        name: data.name,
        subscribeUrl: data.subscribeUrl
      });
    }

    this._dialogBackendService.createGroup({name, subscribeUrl}).pipe(
      switchMap((data) => {
        if (configs && configs.length > 0) {
          return this._dialogBackendService.createConfigsForGroup(data.id, configs).pipe(tap(() =>
            addGroup(data)
          ))
        }

        addGroup(data)

        return of(EMPTY);
      })
    ).subscribe({
      complete: () => {
        this.isLoading.set(false);

        this.observer.complete();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);

        this._alerts.open(err.message, {data: err, appearance: "error"}).subscribe()
      }
    });
  }
}
