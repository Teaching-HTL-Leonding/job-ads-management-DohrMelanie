import { Component, inject, signal, OnInit } from '@angular/core';
import { JobManagementService } from '../job-management.service';
import { Job, Translation } from '../job-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-jobs',
  standalone: true,
  imports: [],
  templateUrl: './all-jobs.component.html',
  styleUrl: './all-jobs.component.css'
})
export class AllJobsComponent implements OnInit{
  constructor(private router: Router) {
  }
  jobs = signal<Job[] | undefined>(undefined);
  private service: JobManagementService = inject(JobManagementService);

  async ngOnInit() {
    this.jobs.set(await this.service.getAllJobs());
  }

  async deleteJob(jobId: number) {
    await this.service.deleteJob(jobId);
    this.jobs.set(await this.service.getAllJobs());
  }

  showJobDetails(jobId: number) {
    this.router.navigate(['/job-details', jobId]);
  }
}
