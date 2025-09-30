import {KeyValuePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {tuiAsPortal, TuiItem, TuiPortals, TuiRepeatTimes} from '@taiga-ui/cdk';
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiDropdownService,
  TuiIcon,
  TuiLink, TuiScrollbar,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiBadgeNotification,
  TuiBreadcrumbs,
  TuiChevron,
  TuiDataListDropdownManager,
  TuiFade,
  TuiSwitch, TuiTab,
  TuiTabs,
} from '@taiga-ui/kit';
import {TuiCardLarge, TuiForm, TuiHeader, TuiNavigation} from '@taiga-ui/layout';

@Component({
  selector: 'app-navigation',
  imports: [
    FormsModule,
    TuiBadge,
    TuiBadgeNotification,
    TuiButton,
    TuiChevron,
    TuiFade,
    TuiNavigation,
    NgOptimizedImage,
    TuiTab,
    TuiTabs,
    RouterLink,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  protected expanded = signal(false);
  protected readonly breadcrumbs = ['Home', 'Angular', 'Repositories', 'Taiga UI'];

  protected handleToggle(): void {
    this.expanded.update((e) => !e);
  }
}
