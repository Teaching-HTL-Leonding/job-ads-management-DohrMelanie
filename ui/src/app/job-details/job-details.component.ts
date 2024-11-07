import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  translatedText = signal<string>("");
  lang = signal<string>("");

  constructor(private route: ActivatedRoute, private router: Router) {  }

  async ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.setJobProperties(parseInt(id));
    }
  }
  async setJobProperties(id: number) {
    const job: Job = await this.service.getJobById(id);
    this.title.set(job.title);
    this.jobId.set(job.id);
    this.textEN.set(job.textEN);
    this.translations.set(job.translations);
  }

  async addTranslation() {
    await this.service.addTranslation(this.jobId(), this.lang(), this.translatedText());
    await this.setJobProperties(this.jobId());
  }
  async autoTranslate() {
    await this.service.autoTranslate(this.jobId(), this.lang());
    await this.setJobProperties(this.jobId());
  }

  async deleteTranslation(lang: string) {
    await this.service.deleteTranslation(this.jobId(), lang);
    await this.setJobProperties(this.jobId());
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

  returnToAllJobs() {
    this.router.navigate(["/all-jobs"]);
  }
}
