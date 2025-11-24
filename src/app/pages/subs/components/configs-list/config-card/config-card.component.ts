import {ChangeDetectionStrategy, Component, inject, input, signal,} from "@angular/core";
import {TuiCardCollapsed, TuiCardLarge, TuiCardRow, TuiHeader,} from "@taiga-ui/layout";
import {TuiAlertService, TuiButton, TuiIcon, TuiTitle} from "@taiga-ui/core";
import {TuiExpand} from "@taiga-ui/experimental";
import {TuiTableDirective, TuiTableTd, TuiTableTh,} from "@taiga-ui/addon-table";
import {DecodeUrlPipe} from "@constructor/pipes/decode-url.pipe";
import {XrayOutboundClientConfig} from "@app/services/types/rdo/xray-outbound.rdo";
import {UpperCasePipe} from "@angular/common";
import {TuiChevron} from '@taiga-ui/kit';

@Component({
  selector: "app-config-card",
  imports: [
    TuiCardCollapsed,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    DecodeUrlPipe,
    TuiCardRow,
    TuiIcon,
    TuiButton,
    TuiExpand,
    TuiTableDirective,
    TuiTableTh,
    TuiTableTd,
    UpperCasePipe,
    TuiChevron,

  ],
  templateUrl: "./config-card.component.html",
  styleUrl: "./config-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DecodeUrlPipe
  ]
})
export class ConfigCardComponent {
  private readonly _alerts = inject(TuiAlertService);
  private readonly _decodeUrlPipe = inject(DecodeUrlPipe);

  public readonly collapsed = signal(true);

  public readonly config = input.required<XrayOutboundClientConfig>();
  public readonly isSelectedCard = input.required<boolean>();

  protected get configIp(): string {
    //vless
    const vnext = this.config().settings.vnext

    //shadowsocks
    const servers = this.config().settings.servers

    if (vnext) {
      return vnext[0].address
    }

    if (servers) {
      return servers[0].address
    }

    return 'Is not defined'
  }

  protected get configPort():  string {
    //vless
    const vnext = this.config().settings.vnext

    //shadowsocks
    const servers = this.config().settings.servers

    if (vnext) {
      return vnext[0].port.toString()
    }

    if (servers) {
      return servers[0].port.toString()
    }

    return 'Is not defined'
  }

  protected onCopy(): void {
    const configToCopy = this.config();

    const name = this._decodeUrlPipe.transform(configToCopy.extra?.clientName ?? '**Incorrect title**')

    this._alerts
      .open(`<strong>${name}</strong> copied`, {
        autoClose: 3000,
      })
      .subscribe();
  }
}
