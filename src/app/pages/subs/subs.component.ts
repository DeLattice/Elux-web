import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {ConfigsListComponent} from "./components/configs-list/configs-list.component";
import {
  ManipulateConfigGroupsComponent
} from "./components/manipulate-config-groups/manipulate-config-groups.component";
import {TuiTablePagination, TuiTablePaginationEvent} from '@taiga-ui/addon-table';
import {SubsStateService} from '@app/pages/subs/subs.state';
import {PaginationParams} from '@constructor/types/pagination-params';
import {XrayConfigEditorComponent} from '@app/components/xray-config-editor/xray-config-editor.component';

@Component({
  selector: "app-subs",
  imports: [ConfigsListComponent, ManipulateConfigGroupsComponent, TuiTablePagination, XrayConfigEditorComponent],
  templateUrl: "./subs.component.html",
  styleUrl: "./subs.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubsComponent {
  private readonly _subStateService = inject(SubsStateService);
}
