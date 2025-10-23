import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse, Company } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class СompanyApiService {
  http = inject(HttpClient);
  private baseApiUrl = 'https://faker-api.milki.space';

  getCompanies(params: any): Observable<ApiResponse<Company>> {
    return this.http.get<ApiResponse<Company>>(
      `${this.baseApiUrl}/companies`,
      { params }
    ).pipe(
      catchError(() => of({
        data: [],
        total_pages: 1,
        has_prev: false,
        has_next: false
      }))
    );
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseApiUrl}/companies/${id}`);
  }

  getIndustries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseApiUrl}/industries`);
  }

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseApiUrl}/types`);
  }
}
