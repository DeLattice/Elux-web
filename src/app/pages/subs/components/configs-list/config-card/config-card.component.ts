import {ChangeDetectionStrategy, Component, inject, input, signal,} from "@angular/core";
import {TuiCardCollapsed, TuiCardLarge, TuiCardRow, TuiHeader,} from "@taiga-ui/layout";
import {TuiAlertService, TuiButton, TuiIcon, TuiTitle} from "@taiga-ui/core";
import {TuiExpand} from "@taiga-ui/experimental";
import {DecodeUrlPipe} from "@constructor/pipes/decode-url.pipe";
import {UniqueXrayOutboundClientConfig} from "@app/services/types/rdo/xray-outbound.rdo";
import {UpperCasePipe} from "@angular/common";
import {TuiChevron} from '@taiga-ui/kit';
import {
  ManipulateConfigGroupsService
} from '@app/pages/subs/components/manipulate-config-groups/manipulate-config-groups.service';

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
  private readonly _manipulateConfigGroupsService = inject(ManipulateConfigGroupsService);

  public readonly collapsed = signal(true);

  public readonly config = input.required<UniqueXrayOutboundClientConfig>();
  public readonly isSelectedCard = input.required<boolean>();

  protected get configIp(): string {
    const vnext = this.config().settings.vnext
    const servers = this.config().settings.servers

    if (vnext) {
      return vnext[0].address
    }

    if (servers) {
      return servers[0].address
    }

    return 'Is not defined'
  }

  protected get configPort(): string {
    const vnext = this.config().settings.vnext
    const servers = this.config().settings.servers

    if (vnext) {
      return vnext[0].port.toString()
    }

    if (servers) {
      return servers[0].port.toString()
    }

    return 'Is not defined'
  }


  protected get configFlow(): string | undefined {
    const vnext = this.config().settings.vnext

    if (vnext) {
      return vnext[0].users[0].flow
    }

    return undefined
  }

  protected onDelete(): void {
    const config = this.config();

    const [id, name] = [config.id, this._decodeUrlPipe.transform(config.extra?.clientName ?? '**Incorrect title**')]

    if (!id) return

    this._manipulateConfigGroupsService.showDialogDeleteConfig({id, name})
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
