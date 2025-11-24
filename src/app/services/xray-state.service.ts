import {computed, inject, Injectable, OnDestroy, signal} from '@angular/core';
import {BehaviorSubject, Observable, skip} from 'rxjs';
import {XrayStatus} from '@app/services/types/enum/xray-status.enum';
import {XrayService} from '@app/services/xray.service';
import {XrayOutboundClientConfig} from '@app/services/types/rdo/xray-outbound.rdo';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class XrayStateService implements OnDestroy {
  private readonly _xrayService = inject(XrayService);

  constructor() {
    this._xrayService.getOutbounds().subscribe((outbounds) => {
      const ids = outbounds
        .filter((config): config is XrayOutboundClientConfig & { tag: string } => config.tag !== undefined)
        .map((config) => parseInt(config.tag));

      this._outbounds.set(ids);
    })
  }

  private _statusSubject: BehaviorSubject<XrayStatus> = new BehaviorSubject<XrayStatus>(XrayStatus.Disabled);
  private _status$: Observable<XrayStatus> = this._statusSubject.asObservable();

  get status$() {
    return this._status$;
  }

  public set setStatus(value: XrayStatus) {
    this._statusSubject.next(value);
  }

  private _outbounds = signal<number[]>([]);
  public readonly outbounds = computed(() => this._outbounds)();

  public readonly outbounds$ = toObservable(
    this._outbounds,
  ).pipe(
    skip(2),
  )

  ngOnDestroy() {
    console.log('XrayStateService: destroying, completing subject.');
    this._statusSubject.complete();
  }
}
