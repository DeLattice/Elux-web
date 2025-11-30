import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigsListBusService {
  private readonly _triggerUpdate = signal<Date>(new Date());

  public updateTrigger() {
    this._triggerUpdate.set(new Date())
  }

  get triggerUpdate() {
    return this._triggerUpdate;
  }
}
