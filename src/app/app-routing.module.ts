import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditoryComponent } from './components/auditory/auditory.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { PackingBudgetComponent } from './components/packing-budget/packing-budget.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DashboardGuard } from './guards/dashboard.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: "", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: PackingBudgetComponent, outlet: "home"}]},
  {path: "local_shipping", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: PackingBudgetComponent, outlet: "home"}]},
  {path: "manage_accounts", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: ManageUsersComponent, outlet: "home"}]},
  {path: "pageview", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: AuditoryComponent, outlet: "home"}]},
  {path: "summarize", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: ReportsComponent, outlet: "home"}]},
  {path: "login", canActivate: [LoginGuard], component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
