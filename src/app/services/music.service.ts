import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { NativeAudio } from '@capacitor-community/native-audio';

export interface music {
  key: string;
  songTitle?: string;
  artist: string;
  avatar: string;
  audioUrl?: string;
  ShareHerf: string;
  isPlaying?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  data: music[] = [];
  topTracks: music[] = [];
  curentTrack!: string;
  private currentTrackData: BehaviorSubject<music[]> = new BehaviorSubject<
    music[]
  >([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  //method to get top tracks from rapi
  getTopTracks(): Observable<any> {
    return this.http
      .get('../../assets/mockdata/tracks/tracks.json', {
        headers: {
          'X-RapidAPI-Key':
            '2e952d394dmsh34b0a4eeb056030p1ee56djsn77860bce7ca8',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
        },
      })
      .pipe(
        map((data: any) => {
          data?.map((item: any) => {
            this.topTracks.push({
              key: item?.key,
              songTitle: item?.title,
              artist: item?.subtitle,
              avatar: item?.images?.coverarthq,
              audioUrl: item?.hub?.actions?.[1].uri,
              ShareHerf: item?.share?.href,
            });
          });

          return this.topTracks;
        })
      );
  }

  searchData(value: string) {
    return this.http
      .get('../../assets/mockdata/tracks/searchData.json', {
        headers: {
          'X-RapidAPI-Key':
            '2e952d394dmsh34b0a4eeb056030p1ee56djsn77860bce7ca8',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
        },
      })
      .pipe(
        map((data: any) => {
          //pushing data from tracks array of response

          data?.tracks.hits.map((item: any) => {
            this.data.push({
              key: item.track.key,
              songTitle: item.track.title,
              artist: item.track.subtitle,
              avatar: item.track?.images.coverarthq,
              audioUrl: item?.track.hub?.actions?.[1].uri,
              ShareHerf: item.track.share.href,
            });
          });

          //pushing data from artist array of response
          data?.artists.hits.map((item: any) => {
            this.data.push({
              key: item.artist.adamid,
              artist: item.artist.name,
              avatar: item.artist.avatar,
              ShareHerf: item.artist.weburl,
            });
          });

          return this.data;
        })
      );
  }

  //preLoad audio with url/path
  preloadAudio(track) {
    //setting current track

    this.curentTrack = track.key;
    NativeAudio.preload({
      assetId: track.key,
      assetPath: track.audioUrl,
      audioChannelNum: 1,
      isUrl: track.audioUrl ? true : false,
      volume: 0.5,
    });
    this.currentTrackData.next(track);
  }

  //method to play audio with refrence id of audio preloaded
  playAudio() {
    setTimeout(() => {
      NativeAudio.play({
        assetId: this?.curentTrack,
        time: 0,
      });
    }, 500);
  }

  //Method to stop audio
  stopAudio() {
    NativeAudio.stop({
      assetId: this?.curentTrack,
    });
  }

  //method to unload current audio in strem
  async unLoadAudio() {
    await NativeAudio.unload({
      assetId: this?.curentTrack,
    });
  }

  getCurrentTrackData(): Observable<music[]> {
    return this.currentTrackData;
  }

  isAudioPlaying() {
    let response: any = '';

    NativeAudio.isPlaying({
      assetId: this?.curentTrack,
    }).then((result) => {
      response = result.isPlaying;
    });
    return response;
  }
}
