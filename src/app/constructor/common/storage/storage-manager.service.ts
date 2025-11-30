import { Injectable, afterNextRender, inject } from '@angular/core';

/* ---------- Memory fallback ---------- */
class MemoryStorage implements Storage {
  private data = new Map<string, string>();

  get length(): number                     { return this.data.size; }
  clear(): void                            { this.data.clear(); }
  getItem(k: string): string | null        { return this.data.get(k) ?? null; }
  key(i: number): string | null            { return Array.from(this.data.keys())[i] ?? null; }
  removeItem(k: string): void              { this.data.delete(k); }
  setItem(k: string, v: string): void      { this.data.set(k, v); }
}

@Injectable({ providedIn: 'root' })
export class StorageManagerService {

  sessionStorage!: Storage;
  localStorage!: Storage;

  constructor() {
    this.sessionStorage = window.sessionStorage
    this.localStorage  = window.localStorage
  }

  /* ---- приватный помощник ---- */
  private storage(type: 'sessionStorage' | 'localStorage'): Storage {
    return type === 'sessionStorage' ? this.sessionStorage : this.localStorage;
  }

  /* ---- публичные методы (сигнатуры как были) ---- */
  save(options: { type: 'sessionStorage' | 'localStorage'; key: string; payload: any }): void {
    if (!options.payload) return;
    try {
      this.storage(options.type).setItem(options.key, JSON.stringify(options.payload));
    } catch (e) {
      console.error('Storage save failed:', e);
    }
  }

  get<T>(options: { type: 'sessionStorage' | 'localStorage'; key: string }): T {
    const raw = this.storage(options.type).getItem(options.key);
    if (!raw) return undefined as unknown as T;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined as unknown as T;
    }
  }

  removeItem<T>(options: { type: 'sessionStorage' | 'localStorage'; key: string }): void {
    this.storage(options.type).removeItem(options.key);
  }

  clearAll(): void {
    this.localStorage.clear();
    this.sessionStorage.clear();
  }
}
