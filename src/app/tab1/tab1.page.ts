import { Component } from '@angular/core';

import recentlyplayed from 'src/assets/mockdata/recentlyPlayed.json';
import heavyRotation from 'src/assets/mockdata/heavyRotation.json';
import jumpBackIn from 'src/assets/mockdata/jumpBackIn.json';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data = [
    {
      title: 'Recently Played',
      albums: recentlyplayed,
    },
    {
      title: 'Heavy Rotation',
      albums: heavyRotation,
    },
    {
      title: 'Jump Back In',
      albums: jumpBackIn,
    },
  ];
  constructor() {}
  openAlbum(data:any){
    console.log(data);
    
  }
}
