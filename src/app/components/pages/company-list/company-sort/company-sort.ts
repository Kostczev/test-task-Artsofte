import { SortConfig } from '../../../../interfaces/api-response.interface';
import { CompanyFacadeService } from '../../../../services/company-facade-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-company-sort',
  imports: [],
  templateUrl: './company-sort.html',
  styleUrl: './company-sort.scss'
})
export class CompanySort {
  sortOptions = [
    {
      field: 'name',
      label: 'Названию'
    },
    {
      field: 'type',
      label: 'Типу'
    },
    {
      field: 'industry',
      label: 'Виду деятельности'
    },
  ]

  currentSort: SortConfig;

  constructor(private companyFacadeService: CompanyFacadeService) {
    this.currentSort = this.companyFacadeService.sortConfig();
  }

  toggleSort(field: string) {
    if (this.currentSort.field === field) {
      this.currentSort = {
        ...this.currentSort,
        order: this.currentSort.order === 'asc' ? 'desc' : 'asc'
      }
    } else {
      this.currentSort = { field, order: 'asc' }
    }
    this.companyFacadeService.setSort(this.currentSort);
  }

  getSortArrowDirection(field: string): string {
    if (this.currentSort.field !== field) return '↕';
    return this.currentSort.order === 'asc' ? '↑' : '↓';
  }
}
