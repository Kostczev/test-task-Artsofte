import { LayoutComponent } from './components/common/layout-component/layout-component';
import { Routes } from '@angular/router';
import { CompanyList } from './components/pages/company-list/company-list';
import { CompanyDetail } from './components/pages/company-detail/company-detail';
import { CompanyYandexMap } from './components/pages/company-yandex-map/company-yandex-map';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent, 
        children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: CompanyList},
            {path: 'detail/:id', component: CompanyDetail},
            {path: 'map', component: CompanyYandexMap},
            {path: '**', redirectTo: 'list'}
        ]
    }
];
