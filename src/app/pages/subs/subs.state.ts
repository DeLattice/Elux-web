import {computed, inject, Injectable, signal} from "@angular/core";
import {SubsService} from "./subs.service";
import {GroupRdo} from '@app/pages/subs/model/rdo/group.rdo';

@Injectable({
  providedIn: "root",
})
export class SubsStateService {
  constructor() {
    this.init()
  }

  private readonly _selectedGroup = signal<GroupRdo | null>(null);
  public readonly activeGroup = computed(() => this._selectedGroup());

  public set setActiveGroup(group: GroupRdo) {
    this._selectedGroup.set(group);
  }

  private readonly _groups = signal<GroupRdo[]>([]);
  public readonly groups = computed(() => this._groups());

  public addGroup(group: GroupRdo) {
    this._groups.update(data => [...data, group]);
  }

  public removeGroup(group: GroupRdo) {
    this._groups.update(data => data.filter(item => item.id !== group.id));
  }

  private readonly subsService = inject(SubsService);

  init() {
    this.subsService.getGroups()
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
