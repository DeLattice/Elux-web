interface MemStatsBySize {
  Size: number;
  Mallocs: number;
  Frees: number;
}

interface MemStats {
  Alloc: number;
  TotalAlloc: number;
  Sys: number;
  Lookups: number;
  Mallocs: number;
  Frees: number;
  HeapAlloc: number;
  HeapSys: number;
  HeapIdle: number;
  HeapInuse: number;
  HeapReleased: number;
  HeapObjects: number;
  StackInuse: number;
  StackSys: number;
  MSpanInuse: number;
  MSpanSys: number;
  MCacheInuse: number;
  MCacheSys: number;
  BuckHashSys: number;
  GCSys: number;
  OtherSys: number;
  NextGC: number;
  LastGC: number;
  PauseTotalNs: number;
  PauseNs: number[];
  PauseEnd: number[];
  NumGC: number;
  NumForcedGC: number;
  GCCPUFraction: number;
  EnableGC: boolean;
  DebugGC: boolean;
  BySize: MemStatsBySize[];
}

interface ObservatoryEntry {
  alive: boolean;
  delay: number;
  outbound_tag: string;
  last_seen_time: number;
  last_try_time: number;
}

interface XrayMetrics {
  cmdline: string[];
  memstats: MemStats;
  observatory: { [key: string]: ObservatoryEntry };
  stats: any | null;
}
