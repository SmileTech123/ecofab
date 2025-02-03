import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BottomNavComponent} from './bottom-nav/bottom-nav.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer, MatSidenavModule
} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIcon, MatIconButton, MatToolbar, MatSidenavContainer, MatNavList, MatListItem, MatSidenav,MatSidenavModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EcoFab';
}
