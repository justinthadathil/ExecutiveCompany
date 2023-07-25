import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { executiveGroupModel, executiveModel } from '../shared/company';

@Injectable({
  providedIn: 'root'
})
export class CompSerService {

  getUrl:string = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getExecutiveGroup(): Observable<executiveGroupModel[]>{
    return this.http.get<executiveGroupModel[]>(`${this.getUrl}executives-groups`)
  }

  postExecutiveGroup(body: executiveGroupModel): Observable<executiveGroupModel>{
    return this.http.post<executiveGroupModel>(`${this.getUrl}executives-groups`, body)
  }

  putExecutiveGroup(body: executiveGroupModel): Observable<executiveGroupModel>{
    return this.http.put<executiveGroupModel>(`${this.getUrl}executives-groups/${body.id}`, body)
  }

  getExecutive(): Observable<executiveModel[]>{
    return this.http.get<executiveModel[]>(`${this.getUrl}executives`)
  }

  postExecutive(body: executiveModel): Observable<executiveModel>{
    return this.http.post<executiveModel>(`${this.getUrl}executives`, body)
  }

  putExecutive(body: executiveModel): Observable<executiveModel>{
    return this.http.put<executiveModel>(`${this.getUrl}executives/${body.id}`, body)
  }

}
