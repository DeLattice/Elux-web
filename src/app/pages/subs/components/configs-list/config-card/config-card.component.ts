import {ChangeDetectionStrategy, Component, inject, input, Pipe, PipeTransform, signal} from '@angular/core';
import {TuiCardCollapsed, TuiCardLarge, TuiCardRow, TuiHeader} from '@taiga-ui/layout';
import {TuiAlertService, TuiButton, TuiIcon, TuiLink, TuiTitle} from '@taiga-ui/core';
import {TuiBadge, TuiChevron} from '@taiga-ui/kit';
import {TuiExpand} from '@taiga-ui/experimental';
import {TuiTableDirective, TuiTableTd, TuiTableTh} from '@taiga-ui/addon-table';
import {DecodeUrlPipe} from '@constructor/pipes/decode-url.pipe';
import {XrayOutboundClientConfig} from '@app/pages/subs/model/rdo/xray/outbound';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-config-card',
  imports: [
    TuiCardCollapsed,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    DecodeUrlPipe,
    TuiCardRow,
    TuiIcon,
    TuiButton,
    TuiChevron,
    TuiExpand,
    TuiTableDirective,
    TuiTableTh,
    TuiTableTd,
    UpperCasePipe,
  ],
  templateUrl: './config-card.component.html',
  styleUrl: './config-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigCardComponent {
  public readonly collapsed = signal(true);

  public readonly config = input.required<XrayOutboundClientConfig>()

  private readonly alerts = inject(TuiAlertService);

  public get ipAddress(): string {
    return ""
  };

  protected onCopy(): void {
    this.alerts
      .open(`IP-адрес **${this.ipAddress}** скопирован`, {
        label: 'Копирование выполнено',
        autoClose: 3000,
      })
      .subscribe();
  }

}
