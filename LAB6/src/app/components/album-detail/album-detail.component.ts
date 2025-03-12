import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService, Album } from '../../services/albums.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  providers: [AlbumsService],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  newTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.albumsService.getAlbum(id).subscribe(data => {
      this.album = data;
      this.newTitle = data.title;
    });
  }

  save(): void {
    if (!this.album) return;

    const updatedAlbum = { ...this.album, title: this.newTitle };
    this.albumsService.updateAlbum(updatedAlbum).subscribe(updated => {
      this.album = updated;
    });
  }

  goBack(): void {
    this.router.navigate(['/albums'], { state: { updatedAlbum: this.album } });
  }
  
}
