import {
  ChangeDetectionStrategy,
  Component, computed, effect,
  inject, Injector, OnInit,
  signal,
} from "@angular/core";
import {
  TuiChevron,
  TuiDataListWrapperComponent,
  TuiSelectDirective,
  TuiTooltip,
} from "@taiga-ui/kit";
import {
  TuiIcon,
  TuiTextfieldComponent,
  TuiTextfieldDropdownDirective,
  TuiTextfieldOptionsDirective,
} from "@taiga-ui/core";
import {FormsModule} from "@angular/forms";
import {ManipulateConfigGroupsService} from "../manipulate-config-groups.service";
import {DashboardStateService} from "@app/dashboard/dashboard.state";
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: "app-groups-select",
  imports: [
    TuiDataListWrapperComponent,
    TuiTextfieldDropdownDirective,
    TuiSelectDirective,
    TuiTextfieldComponent,
    TuiChevron,
    TuiTextfieldOptionsDirective,
    FormsModule,
    TuiIcon,
    TuiTooltip,
  ],
  templateUrl: "./groups-select.component.html",
  styleUrl: "./groups-select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsSelectComponent {
  private readonly manipulateConfigGroupsService = inject(ManipulateConfigGroupsService);
  private readonly dashboardStateService = inject(DashboardStateService);
  private readonly injector = inject(Injector);

  protected readonly groups = signal<string[] | null>(null);

  protected value: string | null = null;

  constructor() {
    this.manipulateConfigGroupsService.getGroupNames().subscribe({
      next: (groups) => {
        this.groups.set(groups);
      },
      error: (error) => {
        console.error("Error fetching group names:", error);
      },
    });

    effect(() => {
      const currentGroups = this.groups();

      if (currentGroups && currentGroups.length > 0) {
        const firstGroup = currentGroups[0];

        this.value = firstGroup;

        this.selectGroup(firstGroup);
      }
    }, { injector: this.injector });
  }

  selectGroup(event: string) {
    this.dashboardStateService.setActiveGroup = event;
  }
}
