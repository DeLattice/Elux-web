import {ChangeDetectionStrategy, Component, inject, signal, ViewChild,} from "@angular/core";
import {TuiScrollable, TuiScrollbar} from "@taiga-ui/core";
import {CdkVirtualScrollViewport, ScrollingModule} from "@angular/cdk/scrolling";
import {ConfigCardComponent} from "./config-card/config-card.component";
import {combineLatest, debounceTime, distinctUntilChanged, of, startWith, switchMap, tap} from "rxjs";
import {takeUntilDestroyed, toObservable} from "@angular/core/rxjs-interop";
import {SubsService} from "../../subs.service";
import {SubsStateService} from "../../subs.state";
import {XrayStateService} from '@app/services/xray-state.service';
import {UniqueXrayOutboundClientConfig} from '@app/services/types/rdo/xray-outbound.rdo';

@Component({
  selector: "app-configs-list",
  imports: [
    ConfigCardComponent,
    ScrollingModule,
    TuiScrollbar,
    TuiScrollable,
  ],
  templateUrl: "./configs-list.component.html",
  styleUrl: "./configs-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigsListComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  private readonly _subsService = inject(SubsService);
  private readonly _subsStateService = inject(SubsStateService);
  private readonly _xrayStateService = inject(XrayStateService);

  protected readonly currentPage = signal(0);
  protected readonly limit = signal(100);
  protected readonly isLoading = signal(false);
  protected readonly allConfigsLoaded = signal(false);
  protected readonly allConfigs = signal<UniqueXrayOutboundClientConfig[]>([]);
  protected readonly outbound_ids = signal<Set<number>>(new Set<number>(this._xrayStateService.outbounds()));

  private readonly activeGroup$ = toObservable(this._subsStateService.activeGroup).pipe(
    distinctUntilChanged((prev, curr) => prev?.id === curr?.id)
  );

  private readonly loadMoreTrigger$ = toObservable(this.currentPage).pipe(
    distinctUntilChanged()
  );

  private readonly configsLoadTrigger$ = combineLatest([
    this.activeGroup$.pipe(
      tap(() => {
        this.allConfigs.set([]);
        this.currentPage.set(0);
        this.allConfigsLoaded.set(false);
        this.viewport?.scrollToIndex(0);
      })
    ),
    this.loadMoreTrigger$.pipe(startWith(0))
  ]).pipe(
    debounceTime(0),
    switchMap(([selectedGroup, page]) => {
      if (!selectedGroup || this.allConfigsLoaded()) {
        return of([]);
      }

      this.isLoading.set(true);
      const paginationParams = {limit: this.limit(), page: page};

      return this._subsService.getGroupConfigs(selectedGroup.id, paginationParams).pipe(
        tap((newConfigs) => {
          this.isLoading.set(false);
          if (newConfigs.length < this.limit()) {
            this.allConfigsLoaded.set(true);
          }

          if (page === 0) {
            this.allConfigs.set(newConfigs);
          } else {
            this.allConfigs.update(current => [...current, ...newConfigs]);
          }
        })
      );
    }),
    takeUntilDestroyed()
  ).subscribe();

  protected loadMoreConfigs(): void {
    if (this.isLoading() || this.allConfigsLoaded()) {
      return;
    }
    this.currentPage.update(page => page + 1);
  }

  protected onVirtualScrollRendered(): void {
    if (this.viewport && !this.isLoading() && !this.allConfigsLoaded()) {
      const end = this.viewport.getRenderedRange().end;
      const total = this.viewport.getDataLength();

      if (total > 0 && end === total) {
        this.loadMoreConfigs();
      }
    }
  }

  protected trackByFn(
    _index: number,
    item: UniqueXrayOutboundClientConfig,
  ): number {
    return item.id;
  }

  protected onSelectConfigCard(id: number): void {
    const ids = new Set(this.outbound_ids());
    if (!ids.delete(id)) {
      ids.add(id);
    }
    this.outbound_ids.set(ids);
    this._xrayStateService.outbounds.set(Array.from(ids));
  }
}
