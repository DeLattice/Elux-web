export interface TlsSettings {
  serverName?: string;
  verifyPeerCertInNames?: string;
  rejectUnknownSni?: boolean;
  allowInsecure?: boolean;
  alpn?: string[];
  minVersion?: string;
  maxVersion?: string;
  cipherSuites?: string;
  certificates?: string[];
  disableSystemRoot?: boolean;
  enableSessionResumption?: boolean;
  fingerprint?: string;
  pinnedPeerCertificateChainSha256?: string[];
  curvePreferences?: string[];
  masterKeyLog?: string;
  echConfigList?: string;
  echServerKeys?: string;
  echForceQuery?: string;
}

export interface RealitySettings {
  fingerprint?: string;
  publicKey: string;
  serverName: string;
  shortId: string;
  spiderX?: string;
}

export interface GRPCSettings {
  serviceName?: string;
  multiMode: boolean;
  idleTimeout?: number;
  healthCheckTimeout?: number;
  permitWithoutStream?: boolean;
  initialWindowsSize?: number;
}

export interface VNext {
  address: string;
  port: number;
  users: User[];
}

export interface ShadowsocksServer {
  address: string;
  port: number;
  method: string;
  password: string;
}

export interface Settings {
  vnext?: VNext[];
  servers?: ShadowsocksServer[];
}

export interface User {
  id: string;
  encryption: string;
  flow?: string;
}

export interface StreamSettings {
  transport?: string;
  security?: string;
  grpc?: GRPCSettings;
  reality?: RealitySettings;
  tls?: TlsSettings;
}

export interface MuxSettings {
  enable: string;
  concurrency?: number;
  xudpConcurrency?: number;
  xudpProxyUdp443?: string;
}

export interface XrayOutboundClientConfig {
  tag?: string;
  protocol: string;
  settings: Settings;
  streamSettings: StreamSettings;
  mux?: MuxSettings;
  nameClient?: string;
}
