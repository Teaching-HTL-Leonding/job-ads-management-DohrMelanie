import { Routes } from '@angular/router';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';

export const routes: Routes = [
  { path:'all-jobs', component: AllJobsComponent},
  { path: 'job-details/:id', component: JobDetailsComponent},
  { path: '', pathMatch:'full', redirectTo:'all-jobs'}
];
