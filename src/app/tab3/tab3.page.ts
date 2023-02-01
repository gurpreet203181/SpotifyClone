import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  constructor(private musicService: MusicService) {}

  ngOnInit() {}

  play() {
    console.log('play');
  }

  stop() {}

  setVolume(value: number) {}
}
//'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/73/65/47/7365473d-bf59-4ef4-308a-961055913fed/mzaf_7366703492386476934.plus.aac.ep.m4a'
