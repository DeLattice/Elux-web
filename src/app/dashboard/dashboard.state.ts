import { Injectable, signal, computed } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DashboardStateService {
  private readonly _selectedGroup = signal<string | null>(null);

  public readonly selectedGroup = computed(() => this._selectedGroup());

  public set setActiveGroup(value: string) {
    this._selectedGroup.set(value);
  }
}
