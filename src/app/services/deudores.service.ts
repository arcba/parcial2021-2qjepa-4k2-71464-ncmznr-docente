import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { of } from 'rxjs';
import { Deudor } from '../models/deudor';

@Injectable({
  providedIn: 'root'
})
export class DeudoresService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pymesbackend.azurewebsites.net/api/deudores';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj: Deudor) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj: Deudor) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }
}
