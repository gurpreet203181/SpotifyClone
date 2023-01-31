import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  tracks!: any[];
  searchData!: any[];
  searchValue: string = '';
  opts = {
    slidesPerView: 2,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true,
  };

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.getTopTracks();
  }
  getTopTracks() {
    this.musicService.getTopTracks().subscribe((res) => {
      this.tracks = res;
      console.log(this.tracks);
    });
  }

  onSearchChange(ev: any) {
    this.searchValue = ev.detail.value;
    this.musicService.searchData(this.searchValue).subscribe((res: any) => {
      this.searchData = res;
      console.log(this.searchData);
    });
  }
  songSelected() {}
}
