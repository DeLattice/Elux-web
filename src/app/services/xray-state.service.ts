import {computed, effect, inject, Injectable, OnDestroy, signal} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {XrayStatus} from "@app/services/types/enum/xray-status.enum";
import {XrayService} from "@app/services/xray.service";
import {XrayOutboundClientConfig} from "@app/services/types/rdo/xray-outbound.rdo";
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

function areSetsEqual<T>(set1: Set<T>, set2: Set<T>): boolean {
  if (set1.size !== set2.size) {
    return false;
  }
  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }
  return true;
}

@Injectable({
  providedIn: "root",
})
export class XrayStateService implements OnDestroy {
  private readonly _xrayService = inject(XrayService);

  constructor() {
    this._getOutboundIds();

    effect(() => {
      const ids = this._outboundIds();

      if (areSetsEqual(ids, this._cachedOutboundIds)) {
        // console.log(123)
        this.isOutboundChanged.set(false)
      }
    });
  }

  private _statusSubject: BehaviorSubject<XrayStatus> =
    new BehaviorSubject<XrayStatus>(XrayStatus.Disabled);
  private _status$: Observable<XrayStatus> = this._statusSubject.asObservable();

  get status$() {
    return this._status$;
  }

  public set setStatus(value: XrayStatus) {
    this._statusSubject.next(value);
  }

  private _cachedOutboundIds: Set<number> = new Set();
  private readonly _outboundIds = signal(new Set<number>());
  public readonly outboundIds = computed(() => this._outboundIds());
  public isOutboundChanged = signal<boolean>(false)

  public setOutboundIds(outboundIds: Set<number>) {
    this._outboundIds.set(outboundIds);
  }

  public insertOrDeleteOutboundId(id: number) {
    this._outboundIds.update(ids => {
      const newIds = new Set(ids);

      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }

      return newIds;
    });

    this.isOutboundChanged.set(true)
  }

  public resetOutboundIds() {
    this.setOutboundIds(this._cachedOutboundIds);
  }

  private _getOutboundIds() {
    this._xrayService.getOutbounds()
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe((outbounds) => {
        const ids = outbounds
          .filter(
            (config): config is XrayOutboundClientConfig & { tag: string } =>
              config.tag !== undefined,
          )
          .map((config) => parseInt(config.tag));

        this._cachedOutboundIds = new Set<number>(ids);
        this.setOutboundIds(this._cachedOutboundIds);
      });
  }

  ngOnDestroy() {
    console.log("XrayStateService: destroying, completing subject.");
    this._statusSubject.complete();
  }
}
