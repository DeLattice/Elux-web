import {ChangeDetectionStrategy, Component, computed, inject} from "@angular/core";
import {TuiButton, TuiIcon} from "@taiga-ui/core";
import {GroupsSelectComponent} from "./groups-select/groups-select.component";
import {SubsGroupStateService} from '@app/pages/subs/subs.group.state';
import {
  ManipulateConfigGroupsService
} from '@app/pages/subs/components/manipulate-config-groups/manipulate-config-groups.service';

@Component({
  selector: "app-manipulate-config-groups",
  imports: [TuiIcon, TuiButton, GroupsSelectComponent],
  templateUrl: "./manipulate-config-groups.component.html",
  styleUrl: "./manipulate-config-groups.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManipulateConfigGroupsComponent {
  private readonly _groupStateService = inject(SubsGroupStateService)
  protected readonly dialogs = inject(ManipulateConfigGroupsService)

  protected readonly isHaveSubUrl = computed<boolean>(() => {
    return !!this._groupStateService.activeGroup()?.subscribeUrl
  });
}
