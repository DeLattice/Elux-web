import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiAlertService, TuiButton} from '@taiga-ui/core';
import {TuiForm} from '@taiga-ui/layout';
import {DialogBackendService} from '@app/pages/subs/components/manipulate-config-groups/dialogs/dialog-backend.service';
import {injectContext} from '@taiga-ui/polymorpheus';
import {type TuiDialogContext} from '@taiga-ui/experimental';
import {Observer} from 'rxjs';
import {XrayStateService} from '@app/services/xray-state.service';

@Component({
  selector: 'app-dialog-delete-config',
  imports: [
    TuiButton,
    TuiForm
  ],
  templateUrl: './dialog-delete-config.component.html',
  styleUrl: './dialog-delete-config.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDeleteConfigComponent {
  private readonly _dialogBackendService = inject(DialogBackendService);
  private readonly _xrayStateService = inject(XrayStateService);
  private readonly _alerts = inject(TuiAlertService);

  protected readonly context = injectContext<TuiDialogContext<void, { id: number, name: string }>>();
  private readonly _observer: Observer<void> = this.context.$implicit;

  protected data = this.context.data;

  private close() {
    const ids = this._xrayStateService.outboundIds();

    if(ids.has(this.data.id)) {
      this._xrayStateService.insertOrDeleteOutboundId(this.data.id)
    }

    this._observer.next()
    this._observer.complete()
  }

  protected cancel() {
    this.close()
  }

  protected onDelete(): void {
    this._dialogBackendService.deleteConfigById(this.data.id).subscribe({
      next: data => {
        this._alerts
          .open(`<strong>${this.data.name}</strong> deleted`, {
            autoClose: 3000,
          })
          .subscribe();

        this.close()
      },
      error: error => {
        this._alerts
          .open("Error deleting the config", {
            appearance: "error",
            autoClose: 3000,
          })
          .subscribe();
      }
    })
  }
}
