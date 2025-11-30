import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef, HostListener,
  inject,
  signal,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {XrayService} from '@app/services/xray.service';
import {NuMonacoEditorComponent, NuMonacoEditorModel} from '@ng-util/monaco-editor';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {TuiActionBarComponent, TuiActionBarDirective} from '@taiga-ui/kit';
import {TuiAlerts, TuiAlertService, TuiBreakpointService, TuiButton} from '@taiga-ui/core';
import {map} from 'rxjs';
import {isXrayConfigurationDto} from '@app/services/types/dto/xray-configuration.dto';

@Component({
  selector: 'app-xray-config-editor',
  imports: [
    FormsModule,
    TuiActionBarComponent,
    TuiActionBarDirective,
    TuiButton,
  ],
  providers: [],
  templateUrl: './xray-config-editor.component.html',
  styleUrl: './xray-config-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XrayConfigEditorComponent {
  private readonly _xrayService = inject(XrayService);
  private readonly _alerts = inject(TuiAlertService);

  private readonly _vcr =
    viewChild('container', {read: ViewContainerRef});

  editCompRef: ComponentRef<NuMonacoEditorComponent> | null = null;

  protected currentValue = '';
  private _cachedValue = '';

  protected isHaveChanging = signal<boolean>(false);

  protected readonly isMobile = toSignal(
    inject(TuiBreakpointService).pipe(map((size) => size === 'mobile')),
  );

  @HostListener('document:keydown.control.s', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();

    this.onSubmit()
  }


  private initEditorComponent(value: string) {
    const component = this.editCompRef = this._vcr()?.createComponent(NuMonacoEditorComponent)!;

    const model: NuMonacoEditorModel = {
      language: 'json',
      value: value
    };

    const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
      theme: 'vs-dark', language: 'json', formatOnPaste: true, formatOnType: true
    };

    component?.setInput('model', model)
    component?.setInput('height', '100%')
    component?.setInput('options', editorOptions)
    component?.instance.registerOnChange((data) => {
      this.validateJson(data)
    })
  }

  private subscribe = this._xrayService.getXrayConfiguration()
    .pipe(
      takeUntilDestroyed()
    )
    .subscribe({
      next: data => {
        const config = this.formatData(JSON.stringify(data))!;

        this._cachedValue = config;

        this.initEditorComponent(config);
      }
    });

  protected onSubmit() {
    const editor = this.editCompRef!

    const rawXrayConfig = JSON.parse(editor.instance.editor?.getValue()!);
    if (!rawXrayConfig) return

    if (!isXrayConfigurationDto(rawXrayConfig)) {
      this._alerts.open('Invalid xray config file', {appearance: 'error'}).subscribe();

      return;
    }

    this._xrayService.applyXrayConfiguration(rawXrayConfig)
      .subscribe({
        next: () => {
          this._cachedValue = this.currentValue

          this.isHaveChanging.set(false);
          this._alerts.open('Success', {appearance: 'success'}).subscribe();
        },
        error: err => {
          this._alerts.open(err, {appearance: 'error'}).subscribe();
        }
      })
  }

  private reset() {
    const editor = this.editCompRef!

    this.currentValue = this._cachedValue

    editor.instance.writeValue(this.currentValue);
  }

  protected cancel() {
    this.reset();

    this.isHaveChanging.set(false)
  }

  private formatData(jsonString: string) {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 4);
    } catch (error) {
      console.error("Invalid JSON", error);
      return null;
    }
  }

  private validateJson(jsonString: string) {
    try {
      JSON.parse(jsonString);

      this.isHaveChanging.set(true);
    } catch (e) {
      this.isHaveChanging.set(false);
    }
  }
}
