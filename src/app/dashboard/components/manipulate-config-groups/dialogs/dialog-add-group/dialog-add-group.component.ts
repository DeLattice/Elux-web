import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  TuiButton,
  TuiIcon,
  TuiTextfield
} from '@taiga-ui/core';
import {TuiTooltip} from '@taiga-ui/kit';
import {TuiForm} from '@taiga-ui/layout';
import {DialogBackendService} from '../dialog-backend.service';

@Component({
  selector: 'app-dialog-add-group',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    FormsModule,
    TuiIcon,
    TuiTooltip,
    TuiButton,
    TuiForm,
  ],
  templateUrl: './dialog-add-group.component.html',
  styleUrl: './dialog-add-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAddGroupComponent {
  private readonly dialogBackendService = inject(DialogBackendService)

  protected readonly form = new FormGroup({
    name: new FormControl('',),
    payload: new FormControl(''),
  });

  createGroup() {
    const name = this.form.get('name')?.value
    const config = this.form.get('payload')?.value

    if (!name || !config) return

    this.dialogBackendService.createGroup({name, config}).subscribe()
  }
}
