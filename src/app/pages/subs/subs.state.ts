import {Injectable, signal, computed, inject} from "@angular/core";
import { SubsService } from "./subs.service";

@Injectable({
  providedIn: "root",
})
export class SubsStateService {
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

  private readonly subsService = inject(SubsService);

  init() {
    this.subsService.getGroupNames()
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
