import { Component, OnInit } from '@angular/core';
import { MusicService, music } from 'src/app/services/music.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  tracks!: any[];
  searchData!: any[];
  searchValue: string = '';

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    //call method to get tracks on screen loading
    this.getTopTracks();
  }
  //getting top tracks using getTopTracks() method from music service

  getTopTracks() {
    this.musicService.getTopTracks().subscribe((res) => {
      this.tracks = res;
      console.log(this.tracks, 'tracks');
    });
  }

  //on type in searchbar method searchdata in music service is called
  onSearchChange(ev: any) {
    this.searchValue = ev.detail.value;
    this.musicService.searchData(this.searchValue).subscribe((res: any) => {
      this.searchData = res;
      console.log(this.searchData, this.searchValue);
    });
  }

  //playing song audio when song is selected
  onSongSelect(track: music) {
    //unloading current track
    this.musicService.unLoadAudio();
    //uploading selected track
    this.musicService.preloadAudio(track);
    //play selected song
    this.musicService.playAudio();
  }
  //naviagtion musice provider link of song/artist
  async navigationWithHerf(herf: string) {
    await Browser.open({ url: herf });
  }
}
