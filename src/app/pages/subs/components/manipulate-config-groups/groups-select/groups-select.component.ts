import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject,} from "@angular/core";
import {TuiChevron, TuiDataListWrapperComponent, TuiSelectDirective, TuiTooltip,} from "@taiga-ui/kit";
import {
  TuiIcon,
  TuiTextfieldComponent,
  TuiTextfieldDropdownDirective,
  TuiTextfieldOptionsDirective,
} from "@taiga-ui/core";
import {FormsModule} from "@angular/forms";
import {SubsGroupStateService} from "@app/pages/subs/subs.group.state";
import {TuiStringHandler} from '@taiga-ui/cdk';
import {GroupRdo} from '@app/pages/subs/model/rdo/group.rdo';

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
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _subsStateService = inject(SubsGroupStateService);

  constructor() {
    effect(() => {
      const currentGroups = this.groups();

      this.selectGroup(currentGroups[currentGroups.length - 1]);

      this._cdr.markForCheck();
    });
  }

  protected stringify: TuiStringHandler<GroupRdo> = (item) => item.name;

  protected readonly groups = this._subsStateService.groups;
  protected value: GroupRdo | null = this._subsStateService.activeGroup();

  selectGroup(event: GroupRdo) {
    this.value = event;
    this._subsStateService.setActiveGroup = event;
  }
}
