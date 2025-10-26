import { TUI_DARK_MODE, TuiRoot } from "@taiga-ui/core";
import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly darkMode = inject(TUI_DARK_MODE);
}
