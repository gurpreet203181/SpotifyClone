import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.page.html',
  styleUrls: ['./player-modal.page.scss'],
})
export class PlayerModalPage implements OnInit {
  currentTrack;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.currentTrack);
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }
}
