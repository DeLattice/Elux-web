import { ChangeDetectionStrategy, Component } from '@angular/core';
import {XrayLogsComponent} from '@app/pages/dashboard/xray-logs/xray-logs.component';
import {TuiScrollbar} from '@taiga-ui/core';

@Component({
  selector: 'app-desktop-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    XrayLogsComponent,
    TuiScrollbar
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
}
