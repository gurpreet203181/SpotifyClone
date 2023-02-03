import { Component, OnInit } from '@angular/core';
import { MusicService, music } from 'src/app/services/music.service';
import { Browser } from '@capacitor/browser';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  tracks: any[] = [];

  searchData!: any[];
  searchValue: string = '';
  currentPage: number = 1;

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    //call method to get tracks on screen loading
    this.getTopTracks();
  }
  //getting top tracks using getTopTracks() method from music service

  getTopTracks() {
    this.musicService.getTopTracks(this.currentPage).subscribe((res) => {
      this.tracks = res;
    });
  }

  //on type in searchbar method searchdata in music service is called
  onSearchChange(ev: any) {
    this.searchValue = ev.detail.value;
    this.musicService.searchData(this.searchValue).subscribe((res: any) => {
      this.searchData = res;
    });
  }

  //playing song audio when song is selected
  async onSongSelect(track: music, listname: string) {
    //uploading selected track
    await this.musicService.preloadAudio(track, listname);
    //play selected song
    this.musicService.playAudio();
  }
  //naviagtion musice provider link of song/artist
  async navigationWithHerf(herf: string) {
    await Browser.open({ url: herf });
  }

  //load More data from music service
  onIonInfinite(ev: any) {
    this.currentPage++;

    this.getTopTracks();
    /* if (ev) {
      ev.target.disable = this.totalPages === this.currentPage;
    }*/
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
