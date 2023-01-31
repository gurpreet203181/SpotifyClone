import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor(private http: HttpClient) {}

  getTopTracks(): Observable<any> {
    return this.http.get('../../assets/mockdata/tracks/tracks.json', {
      headers: {
        'X-RapidAPI-Key': '2e952d394dmsh34b0a4eeb056030p1ee56djsn77860bce7ca8',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
      },
    });
  }

  searchData(value: string) {
    return this.http.get(
      'https://shazam.p.rapidapi.com/search?term=' +
        value +
        '&locale=en-US&offset=0&limit=5',
      {
        headers: {
          'X-RapidAPI-Key':
            '2e952d394dmsh34b0a4eeb056030p1ee56djsn77860bce7ca8',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
        },
      }
    );
  }

  //get tracks of selected chart
  getChartsTracks() {}
}
