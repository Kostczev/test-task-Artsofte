import { Component, inject } from '@angular/core';
import { CompanyFacadeService } from '../../../../services/company-facade-service';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})
export class Pagination {
  companyFacadeService = inject(CompanyFacadeService);
  pagination = this.companyFacadeService.pagination;

  goToPage(page: number): void {
    this.companyFacadeService.goToPage(page);
  }

  getVisiblePages(): (number | string)[] {
    const current = this.pagination().currentPage;
    const total = this.pagination().totalPages;
    const visiblePages = 7;

    if (total <= visiblePages) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const result: (number | string)[] = [];

    result.push(1);

    let startPage = Math.max(2, current - 2);
    let endPage = Math.min(total - 1, current + 2);

    if (current <= 4) {
      endPage = 6;
    } else if (current >= total - 3) {
      startPage = total - 5;
    }

    if (startPage > 2) {
      result.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      result.push(i);
    }

    if (endPage < total - 1) {
      result.push('...');
    }

    result.push(total);

    return result;
  }
}
