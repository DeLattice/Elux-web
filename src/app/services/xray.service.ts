import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {map} from "rxjs";
import {XrayStatus} from "@app/services/types/enum/xray-status.enum";
import {XrayOutboundClientConfig} from '@app/services/types/rdo/xray-outbound.rdo';
import {XrayConfigurationDto} from '@app/services/types/dto/xray-configuration.dto';

@Injectable({
  providedIn: "root",
})
export class XrayService {
  private readonly _http = inject(HttpClient);

  public getXrayConfiguration() {
    return this._http.get("/xray/config");
  }

  public applyXrayConfiguration(payload: XrayConfigurationDto) {
    return this._http.post("/xray/config", payload);
  }

  public getStatus() {
    return this._http
      .get<boolean>("/xray")
      .pipe(map((data) => (data ? XrayStatus.Enabled : XrayStatus.Disabled)));
  }

  public startServer() {
    return this._http.post("/xray/on", {});
  }

  public stopServer() {
    return this._http.post("/xray/off", {});
  }

  public applyOutbounds(config_ids: number[]) {
    return this._http.post<XrayOutboundClientConfig[]>('/xray/outbounds', config_ids)
  }

  public getOutbounds() {
    return this._http.get<XrayOutboundClientConfig[]>('/xray/outbounds')
  }
}
