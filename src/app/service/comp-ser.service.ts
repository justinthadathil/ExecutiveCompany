import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { executiveGroupModel } from '../shared/company';

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

  postExecutiveGroup(body: executiveGroupModel){
    return this.http.post<executiveGroupModel>(`${this.getUrl}executives-groups`, body)
  }

}
