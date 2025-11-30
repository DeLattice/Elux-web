import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {XrayStateService} from '@app/services/xray-state.service';
import {XrayService} from '@app/services/xray.service';
import {TuiAlertService, TuiIcon, TuiLoader} from '@taiga-ui/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable, switchMap, tap} from 'rxjs';
import {XrayStatus} from '@app/services/types/enum/xray-status.enum';
import {TuiBlock, TuiSwitch, TuiTooltip} from '@taiga-ui/kit';

@Component({
  selector: 'app-xray-core-toggle',
  imports: [
    ReactiveFormsModule,
    TuiTooltip,
    TuiLoader,
    TuiBlock,
    TuiIcon,
    TuiSwitch
  ],
  templateUrl: './xray-core-toggle.component.html',
  styleUrl: './xray-core-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XrayCoreToggleComponent implements OnInit {
  private readonly _xrayStateService = inject(XrayStateService);
  private readonly _xrayService = inject(XrayService);
  private readonly _alerts = inject(TuiAlertService);

  protected readonly showLoader = signal<boolean>(true);

  protected readonly xrayStatusControl = new FormControl<boolean>(false, {
    nonNullable: true,
  });

  ngOnInit(): void {
    this.xrayStatusControl.valueChanges
      .pipe(switchMap((value) => this._toggleXrayServer(value)))
      .subscribe({
        error: () => {
          this._xrayStateService.setStatus = XrayStatus.Disabled;
        },
      });

    this._xrayService.getStatus().subscribe((status) => {
      this._xrayStateService.setStatus = status;
    });

    this._xrayStateService.status$.subscribe((status) => {
      this.xrayStatusControl.setValue(status === XrayStatus.Enabled, {
        emitEvent: false,
      });
      this.showLoader.set(false);
    });
  }

  private _toggleXrayServer(mode: boolean): Observable<any> {
    this.showLoader.set(true);

    return (
      mode ? this._xrayService.startServer() : this._xrayService.stopServer()
    ).pipe(
      tap({
        next: () => {
          this._xrayStateService.setStatus = mode
            ? XrayStatus.Enabled
            : XrayStatus.Disabled;
          this._alerts
            .open(mode ? "<strong>Start</strong> successful" : "<strong>Stop</strong> successful", {
              label: "Xray server",
              appearance: "success",
            })
            .subscribe();
        },
        error: () => {
          this._xrayStateService.setStatus = XrayStatus.Disabled;
          
          this._alerts
            .open("Operation failed", {
              label: "Xray server",
              appearance: "error",
            })
            .subscribe();
        },
      })
    );
  }
}
