import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IContract} from '../interface/IContract';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private readonly API_URL = 'http://localhost:8080/api/contract';

  shouldRefresh = new Subject<any>();

  constructor(private  httpClient: HttpClient) {
  }
  getAllContractByHostId(id: number): Observable<IContract[]> {
    return this.httpClient.get<IContract[]>(`${this.API_URL}/host/${id}`);
  }
  updateContract(contract: IContract): Observable<IContract> {
    return this.httpClient.put<IContract>(this.API_URL, contract);
  }
  getContractAccountId(accountId: number): Observable <IContract[]>{
    return this.httpClient.get<IContract[]>(`${environment.apiContractRenter}${accountId}`);
  }
}
