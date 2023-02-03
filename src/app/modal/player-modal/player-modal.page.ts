import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MusicService } from 'src/app/services/music.service';

const vibrant = require('node-vibrant');

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.page.html',
  styleUrls: ['./player-modal.page.scss'],
})
export class PlayerModalPage implements OnInit {
  currentTrack: any = '';
  isPlaying;
  imgPalette: any = [];
  public progress = 0;
  increment: number = 0;
  duration: number = 8.9977324;
  timer;

  //[ngStyle] variabale for content background
  contentBackground!: string;
  subscription: Subscription | undefined;

  constructor(
    private modalCtrl: ModalController,
    private musicService: MusicService
  ) {}

  ngOnInit() {
    this.musicService.getCurrentTrackData().subscribe((data) => {
      this.currentTrack = data;
      this.getVibrant();
      this.setProgressBar();
    });
  }

  //method to close the modal
  cancel() {
    return this.modalCtrl.dismiss(this.isPlaying);
  }

  //method to get color from img and set to content background
  async getVibrant() {
    this.imgPalette = [];
    //getting colors from image using node-vibrant library
    await vibrant
      .from(this.currentTrack.avatar)
      .getPalette()
      .then((palette) => {
        //using object.key to convert return object to array
        Object.keys(palette).forEach((key) => {
          const colorObject = palette[key];
          //pushing all palette rgb color array to imgpalette
          this.imgPalette.push({
            r: colorObject._rgb[0],
            g: colorObject._rgb[1],
            b: colorObject._rgb[2],
          });
        });
      });

    const rgb1 = this.imgPalette[3];
    const rgb2 = this.imgPalette[2];

    //setting content tag background color with rgb values recived from vibrant
    this.contentBackground = `linear-gradient( 

    rgb(${rgb1.r},${rgb1.g},${rgb1.b}), 
    
    rgb(${rgb2.r},${rgb2.g},${rgb2.b}) 
    
    )`;
  }

  //toggle button stop and play function
  togglePlay() {
    if (this.isPlaying) {
      this.musicService.stopAudio();
      this.isPlaying = false;
      clearInterval(this.timer);
    } else {
      this.isPlaying = true;
      this.musicService.playAudio();
    }
  }

  setProgressBar() {
    //setting progress bar interval after reciving new data
    this.progress = 0;
    this.increment = 0.01 / this.duration;
    this.timer = setInterval(() => {
      this.progress += this.increment;
    }, 100);
  }

  nextAudio() {
    this.musicService.nextAudio();
  }
  prevAudio() {
    this.musicService.prevAudio();
  }
}
