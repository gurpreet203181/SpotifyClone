import { Component, ViewChild } from '@angular/core';
import { IonTabs, ModalController } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import { PlayerModalPage } from '../modal/player-modal/player-modal.page';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  @ViewChild(IonTabs) tabs!: IonTabs;
  selected: string = '';
  isPlaying = false;
  currentTrack: any = '';

  constructor(
    private musicService: MusicService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.musicService.getCurrentTrackData().subscribe((data) => {
      this.currentTrack = data;

      if (this.currentTrack.length !== 0) {
        //setting isPlaying to true
        this.isPlaying = true;
      }
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
      this.isPlaying = false;
    } else {
      this.musicService.playAudio();
      this.isPlaying = true;
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: PlayerModalPage,
      componentProps: {
        isPlaying: this.isPlaying,
      },
    });

    modal.onWillDismiss().then((data) => {
      this.isPlaying = data.data;
    });

    modal.present();
  }
}
