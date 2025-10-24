import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, effect,
  inject,
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
import {DashboardStateService} from "@app/dashboard/dashboard.state";

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
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      const currentGroups = this.groups();

      if (this.value && currentGroups && currentGroups.length > 0) {
        this.selectGroup(currentGroups[currentGroups.length - 1]);
      }

      if (!this.value && currentGroups && currentGroups.length > 0) {
        this.selectGroup(currentGroups[currentGroups.length - 1]);
      }

      this.cdr.markForCheck();
    });
  }

  private readonly dashboardStateService = inject(DashboardStateService);

  protected readonly groups = this.dashboardStateService.groups;
  protected value: string | null = null;

  selectGroup(event: string) {
    this.value = event;
    this.dashboardStateService.setActiveGroup = event;
  }
}
