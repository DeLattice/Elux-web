import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupDto} from './model/dto/group.dto';

@Injectable()
export class DialogBackendService {
  private http = inject(HttpClient);

  getGroups() {
    return this.http.get(`/groups`);
  }

  createGroup(payload: GroupDto) {
    return this.http.post(`/groups`, payload);
  }
}
