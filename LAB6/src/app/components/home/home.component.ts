import { Component } from '@angular/core';
import { AlbumsComponent } from '../albums/albums.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [AlbumsComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
