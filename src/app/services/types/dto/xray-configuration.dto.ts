export type XrayConfigurationDto = {
  log: Record<string, any>;
  api: Record<string, any>;
  dns: Record<string, any>;
  routing: Record<string, any>;
  policy: Record<string, any>;
  inbounds: any[];
  outbounds: any[];
  transport: Record<string, any>;
  stats: Record<string, any>;
  reverse: Record<string, any>;
  fakedns: Record<string, any>;
  metrics: Record<string, any>;
  observatory: Record<string, any>;
  burstObservatory: Record<string, any>;
}
