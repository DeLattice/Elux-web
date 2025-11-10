import {ChangeDetectionStrategy, Component, inject, signal, TrackByFunction,} from "@angular/core";
import {TuiScrollable, TuiScrollbar} from "@taiga-ui/core";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {ConfigCardComponent} from "./config-card/config-card.component";
import {AsyncPipe} from "@angular/common";
import {of, switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {SubsService} from "../../subs.service";
import {SubsStateService} from "../../subs.state";
import {XrayStateService} from '@app/services/xray-state.service';
import {UniqueXrayOutboundClientConfig} from '@app/pages/subs/model/rdo/xray/outbound';

@Component({
  selector: "app-configs-list",
  imports: [
    TuiScrollbar,
    TuiScrollable,
    ConfigCardComponent,
    AsyncPipe,
    ScrollingModule,
  ],
  templateUrl: "./configs-list.component.html",
  styleUrl: "./configs-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigsListComponent {
  private readonly _subsService = inject(SubsService);
  private readonly _subsStateService = inject(SubsStateService);
  private readonly _xrayStateService = inject(XrayStateService);

  protected readonly configs$ = toObservable(
    this._subsStateService.selectedGroup,
  ).pipe(
    switchMap((selectedGroup) => {
      if (!selectedGroup) {
        return of([]);
      }

      return this._subsService.getConfigs(selectedGroup.id, {
        limit: 50,
        page: 0,
      });
    }),
  );

  trackByFn(
    _index: number,
    item: UniqueXrayOutboundClientConfig,
  ): number {
    return item.id;
  }

  protected readonly outbound_ids = signal<Set<number>>(new Set<number>(this._xrayStateService.outbounds()));

  protected onSelectConfigCard(id: number): void {
    const ids = this.outbound_ids();

    if (ids.delete(id)) {
      this.outbound_ids.set(ids);

      this._xrayStateService.outbounds.set(Array.from(this.outbound_ids()));

      return;
    }

    this.outbound_ids.update(data => data.add(id));

    this._xrayStateService.outbounds.set(Array.from(this.outbound_ids()));
  }
}
