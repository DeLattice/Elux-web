import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, Subject} from "rxjs";
import { StorageManagerService } from '../common/storage/storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly storageManagerService = inject(StorageManagerService);


  private token: string | null = null;

  private statusCheckingSubject = new Subject<boolean>()
  private status$ = this.statusCheckingSubject.asObservable()

  setToken(token: string) {
    this.checkValidToken(new HttpHeaders({Authorization: token})).subscribe(res => {
      if (res) {
        this.token = token

        this.statusCheckingSubject.next(true)

        this.storageManagerService.save({type: 'sessionStorage', key: 'token', payload: token})
      } else {
        this.statusCheckingSubject.next(false)
      }
    })
  }

  selectStatusCheckingToken() {
    return this.status$
  }

  selectToken() {
    const cachedToken: string = this.storageManagerService.get({type: 'sessionStorage', key: 'token'})

    if (cachedToken) return cachedToken

    return this.token
  }

  //todo не ебу, как оно работает
  //todo переделать
  checkValidToken(headers: HttpHeaders = new HttpHeaders()): Observable<boolean> {
    return this.http.post<any>('/checkCode', {}, {
      headers: headers
    }).pipe(
      map(() => true),
      catchError(error => {
        return of(false);
      })
    );
  }
}
