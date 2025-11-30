import { ViewportRuler } from "@angular/cdk/overlay";
import {
  VirtualScrollStrategy,
  CdkVirtualScrollViewport,
} from "@angular/cdk/scrolling";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { DOCUMENT } from "@angular/common";

@Injectable({ providedIn: "root" })
export class BlockScrollStrategy implements VirtualScrollStrategy {
  private viewportRuler = inject(ViewportRuler);
  private document = inject<Document>(DOCUMENT);

  private scrolledIndexChangeSubject = new Subject<number>();
  scrolledIndexChange: Observable<number> =
    this.scrolledIndexChangeSubject.asObservable();

  private previousOverflow: string | null = null;
  private previousScrollTop = 0;

  enable(): void {
    this.previousOverflow = this.document.documentElement.style.overflow;
    this.previousScrollTop = this.document.documentElement.scrollTop;

    this.document.body.classList.add("cdk-global-scrollblock");

    const container = this.document.querySelector(
      ".scroll-shift-container",
    ) as HTMLElement;

    if (container)
      container.style.transform = `translateY(${-this.previousScrollTop}px)`;
    this.document.documentElement.style.setProperty(
      "--offset-top",
      `${this.previousScrollTop}px`,
    );
  }

  disable(): void {
    this.document.body.classList.remove("cdk-global-scrollblock");

    const container = this.document.querySelector(
      ".scroll-shift-container",
    ) as HTMLElement;

    if (container) {
      container.style.transform = "none";
    }

    this.document.documentElement.scrollTo({
      top: this.previousScrollTop,
      behavior: "instant" as ScrollBehavior,
    });
    this.document.documentElement.style.setProperty("--offset-top", "0");

    if (this.previousOverflow !== null) {
      this.previousOverflow = null;
    }
  }

  // Implementing required interface methods
  attach(viewport: CdkVirtualScrollViewport): void {}
  detach(): void {}
  onContentScrolled(): void {}
  onDataLengthChanged(): void {}
  onContentRendered(): void {}
  onRenderedOffsetChanged(): void {}
  scrollToIndex(index: number, behavior: ScrollBehavior): void {}
}

// Factory function for MAT_DIALOG_SCROLL_STRATEGY
export function blockScrollStrategyFactory(
  viewportRuler: ViewportRuler,
  document: Document,
) {
  // Return a function that creates and returns the strategy
  return () => new BlockScrollStrategy();
}
