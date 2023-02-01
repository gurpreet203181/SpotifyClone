import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { MusicService, music } from '../services/music.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  @ViewChild(IonTabs) tabs!: IonTabs;
  selected: string = '';
  public progress = 0;
  isPlaying = true;

  currentTrack: any = '';

  constructor(private musicService: MusicService) {}
  ngOnInit() {
    this.musicService.getCurrentTrackData().subscribe((data) => {
      this.currentTrack = data;
    });
  }

  //setting selected tab name for icon change
  setSelectedTab() {
    this.selected = String(this.tabs.getSelected());
  }

  //toggle button stop and play function
  togglePlay() {
    if (this.isPlaying) {
      this.musicService.stopAudio();
    } else {
      this.musicService.playAudio();
    }
  }
}
