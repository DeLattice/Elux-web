import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject,} from "@angular/core";
import {TuiChevron, TuiDataListWrapperComponent, TuiSelectDirective, TuiTooltip,} from "@taiga-ui/kit";
import {
  TuiIcon,
  TuiTextfieldComponent,
  TuiTextfieldDropdownDirective,
  TuiTextfieldOptionsDirective,
} from "@taiga-ui/core";
import {FormsModule} from "@angular/forms";
import {SubsStateService} from "@app/pages/subs/subs.state";
import {GroupRdo} from '@app/pages/subs/model/rdo/group.rdo';
import {TuiStringHandler} from '@taiga-ui/cdk';

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
  private readonly _subsStateService = inject(SubsStateService);

  constructor() {
    effect(() => {
      const currentGroups = this.groups();

      if (currentGroups && currentGroups.length > 0) {
        this.selectGroup(currentGroups[currentGroups.length - 1]);
      }
    });
  }

  protected stringify: TuiStringHandler<GroupRdo> = (item) => item.name;

  protected readonly groups = this._subsStateService.groups;
  protected value = this._subsStateService.selectedGroup();

  selectGroup(event: GroupRdo) {
    this.value = event;
    this._subsStateService.setActiveGroup = event;

    this.cdr.markForCheck();
  }
}
