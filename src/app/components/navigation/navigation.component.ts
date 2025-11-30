import { NgOptimizedImage } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";
import {
  TuiBadge,
  TuiBadgeNotification,
  TuiChevron,
  TuiFade,
  TuiTab,
  TuiTabs,
} from "@taiga-ui/kit";
import { TuiNavigation } from "@taiga-ui/layout";
import { HeaderComponent } from "@app/components/navigation/header/header.component";
import { XrayStateService } from "@app/services/xray-state.service";

@Component({
  selector: "app-navigation",
  imports: [
    FormsModule,
    TuiBadge,
    TuiBadgeNotification,
    TuiButton,
    TuiChevron,
    TuiFade,
    TuiNavigation,
    NgOptimizedImage,
    TuiTabs,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.scss",
})
export class NavigationComponent {
  protected expanded = signal(false);
  protected readonly breadcrumbs = [
    "Home",
    "Angular",
    "Repositories",
    "Taiga UI",
  ];

  protected handleToggle(): void {
    this.expanded.update((e) => !e);
  }
}
