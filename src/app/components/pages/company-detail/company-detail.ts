import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Company } from './../../../interfaces/api-response.interface';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogoImg } from "../../common/logo-img/logo-img";
import { CompanyFacadeService } from '../../../services/company-facade-service';

@Component({
  selector: 'app-company-detail',
  imports: [AsyncPipe, LogoImg],
  templateUrl: './company-detail.html',
  styleUrl: './company-detail.scss'
})
export class CompanyDetail {
  company$: Observable<Company>

  constructor(
    private route: ActivatedRoute,
    private companyFacadeService: CompanyFacadeService
  ) {
    const companyId = +this.route.snapshot.paramMap.get('id')!;
    this.company$ = this.companyFacadeService.getCompanyById(companyId);
  }
}
