import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { Observable } from "rxjs";
import { PaginationParams } from "@app/constructor/types/pagination-params";
import { XrayOutboundClientConfig } from "./model/rdo/xray/outbound";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  getGroupNames(): Observable<string[]> {
    return this.http.get<string[]>('groups');
  }

  getConfigs(
    group: string,
    params: PaginationParams,
  ): Observable<XrayOutboundClientConfig[]> {
    return this.http.get<XrayOutboundClientConfig[]>(`/groups/${group}/configs`, {
      params: {
        limit: 100,
        page: 0,
      },
    });
  }
}
