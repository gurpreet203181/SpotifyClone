import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import albums from '../../../assets/mockdata/albums';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  data:any = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    const decodedTitle = decodeURIComponent(String(title));
    this.data = albums[decodedTitle];
  }

  // Helper function for image names
  dasherize(string: any) {
    return string.replace(/[A-Z]/g, function (char: any, index: any) {
      return (index !== 0 ? '-' : '') + char.toLowerCase();
    });
  }
}
