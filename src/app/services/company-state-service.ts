import { computed, Injectable, signal } from '@angular/core';
import { Company, CompanyFilters, SortConfig } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyStateService {
  private _companies = signal<Company[]>([]);
  private _sortConfig = signal<SortConfig>({ field: 'id', order: 'asc' });
  private _page = signal(1);
  private _filters = signal<CompanyFilters>({ q: '', company_type: '', industry: '' });
  private _paginationMeta = signal({
    totalPages: 0,
    hasPrev: false,
    hasNext: false
  });


  readonly companies = this._companies.asReadonly();
  readonly sortConfig = this._sortConfig.asReadonly();
  readonly pagination = computed(() => ({
    currentPage: this._page(),
    ...this._paginationMeta()
  }));
  readonly filters = this._filters.asReadonly();


  setCompanies(companies: Company[]): void {
    this._companies.set(companies);
  }
  setPaginationMeta(totalPages: number, hasPrev: boolean, hasNext: boolean): void {
    this._paginationMeta.set({
      totalPages: totalPages,
      hasPrev: hasPrev,
      hasNext: hasNext
    });
  }
  setSort(sort: SortConfig): void {
    this._sortConfig.set(sort);
    this.resettingPagination();
  }
  setFilters(filters: CompanyFilters): void {
    this._filters.set(filters);
    this.resettingPagination();
  }
  getFilters(): CompanyFilters {
    return this._filters();
  }
  setPage(page: number): void {
    if (page >= 1 && page <= this._paginationMeta().totalPages) {
      this._page.set(page);
    }
  }

  loadNextPage(): void {
    if (this._paginationMeta().hasNext) {
      this._page.set(this._page() + 1);
    }
  }

  loadPrevPage(): void {
    if (this._paginationMeta().hasPrev) {
      this._page.set(this._page() - 1);
    }
  }

  private resettingPagination() {
    this._page.set(1);
  }


  getCurrentParams() {
    return {
      page: this._page(),
      per_page: 30,
      sort_by: this._sortConfig().field,
      sort_order: this._sortConfig().order,
      ...this._filters()
    };
  }
}
