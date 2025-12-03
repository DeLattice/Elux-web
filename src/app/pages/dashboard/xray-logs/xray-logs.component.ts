import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  CdkAutoSizeVirtualScroll,
} from '@angular/cdk-experimental/scrolling';
import {WebSocketService} from '@app/services/websocket.service';
import {Subject, fromEvent, takeUntil, throttleTime} from 'rxjs';

@Component({
  selector: 'app-xray-logs',
  standalone: true,
  imports: [
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    CdkAutoSizeVirtualScroll,
  ],
  templateUrl: "xray-logs.component.html",
  styleUrl: "xray-logs.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XrayLogsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport)
  private readonly viewport!: CdkVirtualScrollViewport;

  readonly messages = signal<string[]>([]);

  private readonly webSocketService = inject(WebSocketService);
  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroy$ = new Subject<void>();

  private isStickToBottom = true;
  private resizeObserver?: ResizeObserver;
  private initialContentLoaded = false;

  constructor() {
    effect(() => {
      if (this.messages().length > 0 && !this.initialContentLoaded) {
        this.initialContentLoaded = true;
        setTimeout(() => this.scrollToBottom(), 0);
      }
    });
  }

  ngOnInit() {
    this.webSocketService.getMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        this.messages.update((current) => [...current, message]);
      });
  }

  ngAfterViewInit() {
    const viewportEl = this.viewport.elementRef.nativeElement;
    const contentWrapper = viewportEl.querySelector('.cdk-virtual-scroll-content-wrapper');

    this.zone.runOutsideAngular(() => {
      if (contentWrapper) {
        this.resizeObserver = new ResizeObserver(() => {
          if (this.isStickToBottom) {
            this.scrollToBottom();
          }
        });
        this.resizeObserver.observe(contentWrapper);
      }

      fromEvent(viewportEl, 'scroll', {passive: true})
        .pipe(
          throttleTime(100, undefined, {leading: true, trailing: true}),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          const {scrollTop, scrollHeight, clientHeight} = viewportEl;
          const distance = scrollHeight - scrollTop - clientHeight;
          this.isStickToBottom = distance < 20;
        });
    });
  }

  private scrollToBottom(): void {
    if (!this.viewport) return;
    const el = this.viewport.elementRef.nativeElement;

    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.resizeObserver?.disconnect();
    this.webSocketService.closeConnection();
  }
}
