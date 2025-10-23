import { Company } from './../../../../interfaces/api-response.interface';
import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LogoImg } from "../../../common/logo-img/logo-img";

@Component({
  selector: 'app-company-item',
  imports: [RouterLink, LogoImg],
  templateUrl: './company-item.html',
  styleUrl: './company-item.scss'
})
export class CompanyItem {
  @Input({ required: true }) company!: Company
}
