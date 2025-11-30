import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, signal} from '@angular/core';
import {TuiAlertContext, TuiButton} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@taiga-ui/polymorpheus';

export interface ErrorAlertData {
  message: string;
}

@Component({
  selector: 'app-server-error-alert',
  imports: [
    TuiButton
  ],
  templateUrl: './server-error-alert.component.html',
  styleUrl: './server-error-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerErrorAlertComponent implements OnInit, OnDestroy {
  secondsLeft = signal(10);
  private timerId: any;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiAlertContext<void, ErrorAlertData>
  ) {
  }

  get data(): ErrorAlertData {
    return this.context.data;
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.secondsLeft.update(value => value - 1);

      if (this.secondsLeft() <= 0) {
        this.reload();
      }
    }, 1000);
  }

  reload() {
    clearInterval(this.timerId);
    window.location.reload();
  }
}
