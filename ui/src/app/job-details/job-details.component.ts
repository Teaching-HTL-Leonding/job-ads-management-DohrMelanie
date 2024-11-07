import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormsModule} from "@angular/forms"
import { Job, Translation, JobManagementService } from '../job-management.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  private service: JobManagementService = inject(JobManagementService)
  jobId = signal<number>(-1);
  title = signal<string>("");
  textEN = signal<string>("");
  translations = signal<Translation[]>([]);

  constructor(private route: ActivatedRoute) {  }

  async ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      const job: Job = await this.service.getJobById(parseInt(id));
      this.title.set(job.title);
      this.jobId.set(job.id);
      this.textEN.set(job.textEN);
      this.translations.set(job.translations);
    }
  }

  updateJob() {
    const job: Job = {
      id: this.jobId(),
      title: this.title(),
      translations: this.translations(),
      textEN: this.textEN()
    }
    this.service.updateJob(job);
  }
}
