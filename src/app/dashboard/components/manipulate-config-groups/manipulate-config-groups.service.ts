import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ManipulateConfigGroupsService {
  private http = inject(HttpClient);

  getGroupNames(): Observable<string[]> {
    return this.http.get<string[]>('groups');
  }

  editGroup(): Observable<string[]> {
    return this.http.get<string[]>('groups');
  }

  addGroup(): Observable<string[]> {
    return this.http.get<string[]>('groups');
  }
}
