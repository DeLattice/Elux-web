import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {TuiScrollable, TuiScrollbar} from '@taiga-ui/core';
import {WebSocketService} from '@app/services/websocket.service';
import {distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-xray-logs',
  imports: [
    TuiScrollbar,
    CdkVirtualScrollViewport,
    TuiScrollable,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
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
        this.messages.update(current => [...current, message]);

        if (this.isStickToBottom) {
          setTimeout(() => {
            this.scrollToBottomInternal();
          });
        }
      });
  }

  forceScrollToBottom() {
    this.isStickToBottom = true;
    this.scrollToBottomInternal();
  }

  private scrollToBottomInternal() {
    if (!this.viewport) return;

    const lastIndex = this.messages().length - 1;

    this.viewport.scrollToIndex(lastIndex, 'smooth');
  }

  onScroll() {
    if (!this.viewport) return;

    const bottomOffset = this.viewport.measureScrollOffset('bottom');

    this.isStickToBottom = bottomOffset < 50;
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy() {
    this._webSocketService.closeConnection();
  }
}
