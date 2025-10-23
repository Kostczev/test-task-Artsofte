import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { CompanyFilters } from '../../../../interfaces/api-response.interface';
import { CompanyFacadeService } from '../../../../services/company-facade-service';

@Component({
  selector: 'app-company-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './company-filter.html',
  styleUrl: './company-filter.scss'
})
export class CompanyFilter implements OnInit {
  fb = inject(FormBuilder);
  companyFacadeService = inject(CompanyFacadeService);

  industryOptions: string[] = [];
  typeOptions: string[] = [];

  searchForm = this.fb.group({
    q: [''],
    industry: [''],
    company_type: ['']
  })

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        tap(formValue => {
          this.companyFacadeService.setFilters(formValue as CompanyFilters);
        })
      )
      .subscribe();

  }

  ngOnInit(): void {
    this.companyFacadeService.getIndustries().subscribe(industries => {
      this.industryOptions = industries;
    })
    this.companyFacadeService.getTypes().subscribe(types => {
      this.typeOptions = types;
    });

    this.initializeFormFromService();
  }

  private initializeFormFromService() {
    const currentFilters = this.companyFacadeService.getFilters();

    this.searchForm.setValue({
      q: currentFilters.q || '',
      industry: currentFilters.industry || '',
      company_type: currentFilters.company_type || ''
    }, { emitEvent: false });
  }
}
