import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BASE_URL } from './app.config';


export type Translation = {
  language: string,
  translatedText: string
}

export type Job = {
  title: string,
  textEN: string,
  id: number,
  translations: Translation[]
}

@Injectable({
  providedIn: 'root'
})
export class JobManagementService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  constructor() { }

  getAllJobs(): Promise<Job[]> {
    return firstValueFrom(this.httpClient.get<Job[]>(`${this.baseUrl}/ads`));
  }

  deleteJob(jobId: number): Promise<void> {
    return firstValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/ads/${jobId}`));
  }

  getJobById(jobId: number): Promise<Job> {
    return firstValueFrom(this.httpClient.get<Job>(`${this.baseUrl}/ads/${jobId}`))
  }

}
