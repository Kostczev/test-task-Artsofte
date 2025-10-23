import { Component, computed, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CompanyFacadeService } from '../../../../services/company-facade-service';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})
export class Pagination implements OnInit, OnDestroy {
  companyFacadeService = inject(CompanyFacadeService);
  pagination = this.companyFacadeService.pagination;

  private screenWidth = signal(window.innerWidth);
  private destroy$ = new Subject<void>();
  private resize$ = new Subject<void>();

  @HostListener('window:resize')
  onResize() {
    this.resize$.next();
  }

  ngOnInit() {
    this.resize$.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.screenWidth.set(window.innerWidth);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  readonly visiblePages = computed(() => {
    const current = this.pagination().currentPage;
    const total = this.pagination().totalPages;
    let visibleCount = 7;
    if (this.screenWidth() < 480) {
      visibleCount = 3;
    } else if (this.screenWidth() < 768) {
      visibleCount = 5;
    }
    const step = Math.floor(visibleCount / 2);

    return this.calculateVisiblePages(current, total, visibleCount, step);
  });

  goToPage(page: number): void {
    this.companyFacadeService.goToPage(page);
  }


  private calculateVisiblePages(current: number, total: number, visiblePages: number, step: number): (number | string)[] {
    if (total <= visiblePages) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const result: (number | string)[] = [];

    result.push(1);

    let startPage = Math.max(2, current - step);
    let endPage = Math.min(total - 1, current + step);

    if (current <= step + 1) {
      endPage = visiblePages - 1;
    } else if (current >= total - 3) {
      startPage = total - visiblePages + 2;
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
