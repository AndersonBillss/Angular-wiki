import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';4
import { parsePageContent } from './functions/pageContentFunctions';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  pageHtml: string | undefined = ''

  ngOnInit(): void {
    const string = "this is a test [[string|samplePage]] for my wiki website. I will create a function to turn this string into innerHtml with links in it. Linked strings will be in this format: ![[string|targetRoute]]. <div></div> <> '' &&&&"

    this.pageHtml = parsePageContent(string)
    if(this.pageHtml == undefined){
      console.log('parsing error')
    }
  }
  

/*   
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
        console.log(result)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'angular-wiki.client'; */
}
