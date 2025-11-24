import { ChangeDetectionStrategy, Component } from '@angular/core';
import {XrayLogsComponent} from '@app/pages/dashboard/xray-logs/xray-logs.component';

@Component({
  selector: 'app-desktop-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    XrayLogsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
}
