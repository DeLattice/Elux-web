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

export function isXrayConfigurationDto(obj: XrayConfigurationDto): boolean {
  const requiredKeys = [
    'log', 'routing',
    'inbounds', 'outbounds',
    'metrics',
  ];

  for (const key of requiredKeys) {
    if (!(key in obj)) {
      return false;
    }
  }

  if (!Array.isArray(obj.inbounds) || !Array.isArray(obj.outbounds)) {
    return false;
  }

  if (typeof obj.log !== 'object' || obj.log === null || Array.isArray(obj.log)) return false;
  if (typeof obj.routing !== 'object' || obj.routing === null || Array.isArray(obj.routing)) return false;

  return true;
}
