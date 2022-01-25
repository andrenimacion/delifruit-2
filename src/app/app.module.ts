import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { PackingBudgetComponent } from './components/packing-budget/packing-budget.component';
import { CourtOrderComponent } from './components/court-order/court-order.component';
import { BoxConveyorComponent } from './components/box-conveyor/box-conveyor.component';
import { ContainerControlComponent } from './components/container-control/container-control.component';
import { WeeksControlsComponent } from './components/weeks-controls/weeks-controls.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { BoxandmarkComponent } from './components/boxandmark/boxandmark.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RequiredPasswordComponent } from './components/required-password/required-password.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AuditoryComponent } from './components/auditory/auditory.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { DBConfig } from 'ngx-indexed-db';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgChartsModule } from 'ng2-charts';

const dbConfig: DBConfig = {
  name: 'Delifruit',
  version: 1,
  objectStoresMeta: [{
    store: 'people',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    PackingBudgetComponent,
    CourtOrderComponent,
    BoxConveyorComponent,
    ContainerControlComponent,
    WeeksControlsComponent,
    DashboardComponent,
    BoxandmarkComponent,
    RequiredPasswordComponent,
    ManageUsersComponent,
    EditUserComponent,
    AuditoryComponent,
    ReportsComponent
  ],
  imports: [
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    FlexLayoutModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    NgxPaginationModule,
    FormsModule,
    NgChartsModule,
    
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
