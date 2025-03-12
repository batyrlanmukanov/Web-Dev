import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lab6';
}
