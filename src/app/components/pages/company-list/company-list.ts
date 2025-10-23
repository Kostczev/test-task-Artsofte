import { Component, inject } from '@angular/core';
import { CompanyItem } from './company-item/company-item';
import { CompanyFilter } from "./company-filter/company-filter";
import { CompanySort } from "./company-sort/company-sort";
import { Pagination } from "./pagination/pagination";
import { CompanyFacadeService } from '../../../services/company-facade-service';

@Component({
  selector: 'app-company-list',
  imports: [CompanyItem, CompanyFilter, CompanySort, Pagination],
  templateUrl: './company-list.html',
  styleUrl: './company-list.scss'
})
export class CompanyList {
  companyFacadeService = inject(CompanyFacadeService);
  companies = this.companyFacadeService.companies;
}
