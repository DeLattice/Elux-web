import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  tuiCreateLuhnValidator,
  TuiInputCard,
  TuiInputCVC,
  TuiInputExpire,
} from '@taiga-ui/addon-commerce';
import {
  TuiAlertService, TuiAppearance, TuiButton,
  TuiError, TuiHintDirective, TuiIcon,
  TuiTextfield
} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiTooltip} from '@taiga-ui/kit';
import {TuiForm} from '@taiga-ui/layout';

@Component({
  selector: 'app-dialog-edit-group',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    FormsModule,
    TuiIcon,
    TuiTooltip,
    TuiButton,
    TuiForm,
  ],
  templateUrl: './dialog-edit-group.component.html',
  styleUrl: './dialog-edit-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogEditGroupComponent {
  protected readonly form = new FormGroup({
    name: new FormControl('',),
    payload: new FormControl(''),
  });
}
