import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {TuiAlertService, TuiButton} from '@taiga-ui/core';
import {XrayStateService} from '@app/services/xray-state.service';
import {XrayService} from '@app/services/xray.service';
import {EMPTY, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  constructor() {
    this._xrayStateService.outbounds$
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (d) =>
          this.isOutboundChanged.set(true)
      })
  }

  private readonly _xrayStateService = inject(XrayStateService);
  private readonly _xrayService = inject(XrayService);
  private readonly _alerts = inject(TuiAlertService);

  //todo make detect if outbounds === outbounds then hide button
  private _outbounds: number[] = [];

  protected isOutboundChanged = signal<boolean>(false)

  public applyOutbound() {
    this._xrayService.applyOutbounds(this._xrayStateService.outbounds())
      .pipe(
        switchMap(() => {
          this._alerts.open("<strong>Outbound</strong> applied", {
            label: "Xray server",
            appearance: "success",
          }).subscribe();

          this.isOutboundChanged.set(false);
          return EMPTY;
        })
      )
      .subscribe({
        error: err => {
          this._alerts.open("<strong>Outbound</strong> not applied", {
            label: "Xray server",
            appearance: "error",
          }).subscribe();
        }
      });
  }

}
