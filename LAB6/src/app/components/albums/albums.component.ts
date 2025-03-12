import { Component, OnInit } from '@angular/core';
import { AlbumsService, Album, Photo } from '../../services/albums.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AlbumWithPhotos extends Album {
  photos?: Photo[];
}

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: AlbumWithPhotos[] = [];
  newAlbumTitle: string = '';

  constructor(private albumsService: AlbumsService) {}

  ngOnInit(): void {
    this.albumsService.getAlbums().subscribe(data => {
      this.albums = data;
  
      const updatedAlbum = history.state.updatedAlbum;
      if (updatedAlbum) {
        this.albums = this.albums.map(album =>
          album.id === updatedAlbum.id ? updatedAlbum : album
        );
      }
    });
  }

  addAlbum(): void {
    if (!this.newAlbumTitle.trim()) return;

    const newAlbum: Omit<Album, 'id'> = { userId: 1, title: this.newAlbumTitle };

    this.albumsService.addAlbum(newAlbum).subscribe(album => {
      this.albums = [...this.albums, { ...album, photos: [] }];
      this.newAlbumTitle = '';
    });
  }

  deleteAlbum(id: number): void {
    this.albumsService.deleteAlbum(id).subscribe(() => {
      this.albums = this.albums.filter(album => album.id !== id);
    });
  }

  loadPhotos(albumId: number): void {
    this.albumsService.getPhotos(albumId).subscribe(photos => {
      const album = this.albums.find(a => a.id === albumId);
      if (album) album.photos = photos;
    });
  }

  trackById(index: number, album: AlbumWithPhotos): number {
    return album.id!;
  }
}
