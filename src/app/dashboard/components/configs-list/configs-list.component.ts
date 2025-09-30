import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from "@angular/core";
import {TuiScrollable, TuiScrollbar} from "@taiga-ui/core";
import {DashboardService} from "../../dashboard.service";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {ConfigCardComponent} from "./config-card/config-card.component";
import {AsyncPipe} from "@angular/common";
import {DashboardStateService} from "@app/dashboard/dashboard.state";
import {map, of, switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";

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
  private readonly dashboardService = inject(DashboardService);
  private readonly dashboardStateService = inject(DashboardStateService);

  protected readonly configs$ = toObservable(
    this.dashboardStateService.selectedGroup,
  ).pipe(
    switchMap((selectedGroup) => {
      if (!selectedGroup) {
        console.warn("No group selected");
        return of([]);
      }

      return this.dashboardService.getConfigs(selectedGroup, {
        limit: 50,
        page: 0,
      });
    }),
    map((data) => chunkArrayInPairs(data))
  );
}

function chunkArrayInPairs<T>(arr: T[]): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += 2) {
    const pair: T[] = [arr[i]];

    if (i + 1 < arr.length) {
      pair.push(arr[i + 1]);
    }

    result.push(pair);
  }

  return result;
}
