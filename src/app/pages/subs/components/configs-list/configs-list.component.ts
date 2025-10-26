import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { TuiScrollable, TuiScrollbar } from "@taiga-ui/core";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ConfigCardComponent } from "./config-card/config-card.component";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { map, of, switchMap, tap } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { SubsService } from "../../subs.service";
import { SubsStateService } from "../../subs.state";

@Component({
  selector: "app-configs-list",
  imports: [
    TuiScrollbar,
    TuiScrollable,
    ConfigCardComponent,
    AsyncPipe,
    JsonPipe,
    ScrollingModule,
  ],
  templateUrl: "./configs-list.component.html",
  styleUrl: "./configs-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigsListComponent {
  private readonly subsService = inject(SubsService);
  private readonly subsStateService = inject(SubsStateService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  protected readonly configs$ = toObservable(
    this.subsStateService.selectedGroup,
  ).pipe(
    switchMap((selectedGroup) => {
      if (!selectedGroup) {
        console.warn("No group selected");
        return of([]);
      }

      return this.subsService.getConfigs(selectedGroup, {
        limit: 50,
        page: 0,
      });
    }),
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
