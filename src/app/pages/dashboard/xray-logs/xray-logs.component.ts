import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { TuiScrollable, TuiScrollbar } from '@taiga-ui/core';
import { distinctUntilChanged } from 'rxjs';
import {WebSocketService} from '@app/services/websocket.service';
import {CdkAutoSizeVirtualScroll} from '@angular/cdk-experimental/scrolling';

@Component({
  selector: 'app-xray-logs',
  standalone: true,
  imports: [
    TuiScrollbar,
    TuiScrollable,
    CdkAutoSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
  ],
  templateUrl: './xray-logs.component.html',
  styleUrl: './xray-logs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XrayLogsComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport)
  private readonly viewport?: CdkVirtualScrollViewport;

  messages = signal<string[]>([]);

  private readonly _webSocketService = inject(WebSocketService);
  private isStickToBottom = true;

  ngOnInit() {
    this._webSocketService.getMessages()
      .pipe(distinctUntilChanged())
      .subscribe((message) => {
        // Запоминаем текущую позицию
        const wasStick = this.isStickToBottom;
        const currentScrollTop = this.viewport?.elementRef.nativeElement.scrollTop ?? 0;

        this.messages.update((current) => [...current, message]);

        // Autosize требует времени на пересчет, поэтому setTimeout обязателен
        setTimeout(() => {
          if (!this.viewport) return;

          if (wasStick) {
            this.scrollToBottomInternal();
          } else {
            // При autosize скролл может прыгнуть, поэтому жестко фиксируем его обратно
            // если мы смотрели историю
            this.viewport.elementRef.nativeElement.scrollTop = currentScrollTop;
          }
        }, 0);
      });
  }

  forceScrollToBottom() {
    this.isStickToBottom = true;
    this.scrollToBottomInternal(true);
  }

  private scrollToBottomInternal(smooth?: boolean) {
    if (!this.viewport) return;

    // Скроллим к реальной высоте всего контента
    const viewportNative = this.viewport.elementRef.nativeElement;
    this.viewport.scrollToOffset(viewportNative.scrollHeight, smooth ? 'smooth' : 'auto');
  }

  onScroll() {
    if (!this.viewport) return;

    const element = this.viewport.elementRef.nativeElement;
    // Расчет расстояния до низа
    const distanceFromBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

    // Если мы ближе 50px к низу, включаем авто-скролл
    this.isStickToBottom = Math.abs(distanceFromBottom) < 50;
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy() {
    this._webSocketService.closeConnection();
  }
}
