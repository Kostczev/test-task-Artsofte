import { effect, inject, Injectable } from '@angular/core';
import { СompanyApiService } from './сompany-api-service';
import { CompanyStateService } from './company-state-service';
import { CompanyFilters, SortConfig } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyFacadeService {
  private api = inject(СompanyApiService);
  private state = inject(CompanyStateService);

  constructor() {
    effect(() => {
      const params = this.state.getCurrentParams();
      this.loadCompanies(params);
    });
  }

  private loadCompanies(params: any): void {
    this.api.getCompanies(params).subscribe(response => {
      this.state.setCompanies(response.data);
      this.state.setPaginationMeta(response.total_pages, response.has_prev, response.has_next);
    });
  }

  readonly companies = this.state.companies;
  readonly pagination = this.state.pagination;
  readonly sortConfig = this.state.sortConfig;

  setSort(sort: SortConfig): void {
    this.state.setSort(sort);
  }

  setFilters(filters: CompanyFilters): void {
    this.state.setFilters(filters);
  }

  goToPage(page: number): void {
    this.state.setPage(page);
  }

  loadNextPage(): void {
    this.state.loadNextPage();
  }

  loadPrevPage(): void {
    this.state.loadPrevPage();
  }

  getFilters(): CompanyFilters {
    return this.state.getFilters();
  }

  getIndustries() {
    return this.api.getIndustries();
  }

  getTypes() {
    return this.api.getTypes();
  }

  getCompanyById(id: number) {
    return this.api.getCompanyById(id);
  }
}
