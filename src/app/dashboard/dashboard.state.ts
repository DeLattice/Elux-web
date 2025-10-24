import {Injectable, signal, computed, inject} from "@angular/core";
import {XrayOutboundClientConfig} from '@app/dashboard/model/rdo/xray/outbound';
import {
  ManipulateConfigGroupsService
} from '@app/dashboard/components/manipulate-config-groups/manipulate-config-groups.service';
import {DashboardService} from '@app/dashboard/dashboard.service';

@Injectable({
  providedIn: "root",
})
export class DashboardStateService {
  constructor() {
    this.init()
  }

  private readonly _selectedGroup = signal<string | null>(null);

  public readonly selectedGroup = computed(() => this._selectedGroup());

  public set setActiveGroup(value: string) {
    this._selectedGroup.set(value);
  }

  private readonly _groups = signal<string[]>([]);

  public readonly groups = computed(() => this._groups());

  public addGroup(name: string) {
    this._groups.update(data => [...data, name]);
  }

  public removeGroup(name: string) {
    this._groups.update(data => data.filter(item => item !== name));
  }

  private readonly dashboardService = inject(DashboardService);

  init() {
    this.dashboardService.getGroupNames()
      .subscribe({
        next: (groups) => {
          this._groups.set(groups);
        },
        error: (error) => {
          console.error("Error fetching group names:", error);
        },
      });
  }
}
