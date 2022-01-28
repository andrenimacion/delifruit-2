import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditoryComponent } from './components/auditory/auditory.component';
import { ChartbarComponent } from './components/chartbar/chartbar.component';
import { ChartlineComponent } from './components/chartline/chartline.component';
import { Chartline2Component } from './components/chartline2/chartline2.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { PackingBudgetComponent } from './components/packing-budget/packing-budget.component';
import { ReportComponent } from './components/report/report.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DashboardGuard } from './guards/dashboard.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: "", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: PackingBudgetComponent, outlet: "home"}]},
  {path: "local_shipping", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: PackingBudgetComponent, outlet: "home"}]},
  {path: "manage_accounts", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: ManageUsersComponent, outlet: "home"}]},
  {path: "pageview", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: AuditoryComponent, outlet: "home"}]},
  {path: "summarize", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: ReportComponent, outlet: "home"}]},
  {path: "summarize/chartline", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: ChartlineComponent, outlet: "home"}]},
  {path: "summarize/chartline2", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: Chartline2Component, outlet: "home"}]},
  {path: "summarize/chartbar", canActivate: [DashboardGuard], component: DashboardComponent, children: [{path: "", component: ChartbarComponent, outlet: "home"}]},
  {path: "login", canActivate: [LoginGuard], component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
