import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthSummaryComponent } from 'src/app/components/month-summary/month-summary.component';
import { GeneralMainPageComponent } from 'src/app/components/general-main-page/general-main-page.component';
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { authGuard } from '../../common/auth.guard';
import { CategoryCreationComponent } from 'src/app/components/category-creation/category-creation.component';
import { ViewHistoryComponent } from 'src/app/components/view-history/view-history.component';
import { ProductDetailComponent } from 'src/app/components/product-detail/product-detail.component';
import { CategoryListComponent } from 'src/app/components/category-list/category-list.component';
import { PerfilUserComponent } from 'src/app/components/perfil-user/perfil-user.component';
import { AdminPainelComponent } from 'src/app/components/admin-painel/admin-painel.component';


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: GeneralMainPageComponent },
      { path: 'resumo-mensal', component: MonthSummaryComponent },
      { path: 'categoria', component: CategoryListComponent },
      { path: 'criacao-nova-categoria', component: CategoryCreationComponent },
      { path: 'historico-pedidos', component: ViewHistoryComponent },
      { path: 'item/:id', component: ProductDetailComponent },
      { path: 'perfil-user', component: PerfilUserComponent},
      { path: 'admin-painel', component: AdminPainelComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingRoutingModule {}
