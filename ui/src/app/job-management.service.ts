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

  public getAllJobs(): Promise<Job[]> {
    return firstValueFrom(this.httpClient.get<Job[]>(`${this.baseUrl}/ads`));
  }

  public deleteJob(jobId: number): Promise<void> {
    return firstValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/ads/${jobId}`));
  }

  public getJobById(jobId: number): Promise<Job> {
    return firstValueFrom(this.httpClient.get<Job>(`${this.baseUrl}/ads/${jobId}`));
  }

  public updateJob(job: Job): Promise<void> {
    return firstValueFrom(this.httpClient.patch<void>(`${this.baseUrl}/ads/${job.id}`, job));
  }

  public async addTranslation(jobId: number, lang: string, translated: string): Promise<void> {
    const job: Job = await this.getJobById(jobId);
    return firstValueFrom(this.httpClient.put<void>(`${this.baseUrl}/ads/${jobId}/translations/${lang}`, {
      translatedText: translated
    }));
  }

  public async deleteTranslation(jobId: number, lang: string) {
    return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/ads/${jobId}/translations/${lang}`))
  }

  public async autoTranslate(jobId: number, lang: string) {
    const job: Job = await this.getJobById(jobId);
    const translate = {
      text: job.textEN,
      source_lang: "EN",
      target_lang: lang
    }
    type TranslationResp = {
      translation: string
    }
    const translated: TranslationResp = await firstValueFrom(this.httpClient.post<TranslationResp>(`${this.baseUrl}/deepl/v2/translate`, translate));
    console.log(translated.translation);

    return firstValueFrom(this.httpClient.put<void>(`${this.baseUrl}/ads/${jobId}/translations/${lang}`, {
      translatedText: translated.translation
    }));
  }
}
