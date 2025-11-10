import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {inject} from "@angular/core/primitives/di";
import {Observable} from "rxjs";
import {PaginationParams} from "@app/constructor/types/pagination-params";
import {UniqueXrayOutboundClientConfig} from "./model/rdo/xray/outbound";
import {GroupRdo} from '@app/pages/subs/model/rdo/group.rdo';

@Injectable({
  providedIn: "root",
})
export class SubsService {
  private readonly http = inject(HttpClient);

  getGroupNames(): Observable<GroupRdo[]> {
    return this.http.get<GroupRdo[]>('groups');
  }

  getConfigs(
    groupId: number,
    prms: PaginationParams = {
      limit: 100,
      page: 0,
    },
  ): Observable<UniqueXrayOutboundClientConfig[]> {
    return this.http.get<UniqueXrayOutboundClientConfig[]>(`/groups/${groupId}/configs`, {
      params: {...prms}
    });
  }
}
