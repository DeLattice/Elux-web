import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {TuiAlertService, TuiButton} from '@taiga-ui/core';
import {XrayStateService} from '@app/services/xray-state.service';
import {XrayService} from '@app/services/xray.service';
import {EMPTY, finalize, switchMap} from 'rxjs';

@Component({
  selector: 'app-xray-core-config-applier',
  imports: [
    TuiButton
  ],
  templateUrl: './xray-core-config-applier.component.html',
  styleUrl: './xray-core-config-applier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XrayCoreConfigApplierComponent {
  private readonly _xrayStateService = inject(XrayStateService);
  private readonly _xrayService = inject(XrayService);
  private readonly _alerts = inject(TuiAlertService);

  protected isOutboundChanged = computed(() => this._xrayStateService.isOutboundChanged());

  protected reset() {
    this._xrayStateService.resetOutboundIds()

    this._xrayStateService.isOutboundChanged.set(false)
  }

  protected applyOutbound() {
    this._xrayService.applyOutbounds(Array.from(this._xrayStateService.outboundIds()))
      .pipe(
        switchMap(() => {
          this._alerts.open("Outbound(s) applied", {
            label: "Xray server",
            appearance: "success",
          }).subscribe();

          return EMPTY;
        }),
        finalize(() =>
          this._xrayStateService.isOutboundChanged.set(false)
        )
      )
      .subscribe({
        error: err => {
          this._alerts.open("Outbound(s) not applied", {
            label: "Xray server",
            appearance: "error",
          }).subscribe();
        }
      });
  }
}
