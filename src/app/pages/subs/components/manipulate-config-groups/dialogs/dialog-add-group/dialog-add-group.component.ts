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
import {injectContext} from '@taiga-ui/polymorpheus';
import {Observer} from 'rxjs';
import {TuiDialogContext} from '@taiga-ui/experimental';
import {DashboardStateService} from '@app/pages/dashboard/dashboard.state';
import { SubsStateService } from '@app/pages/subs/subs.state';

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
  private readonly subsStateService = inject(SubsStateService)
  public readonly context = injectContext<TuiDialogContext<void, string>>();
  private readonly observer: Observer<void> = this.context.$implicit;

  protected readonly form = new FormGroup({
    name: new FormControl('',),
    payload: new FormControl(''),
  });

  createGroup() {
    const name = this.form.get('name')?.value
    const config = this.form.get('payload')?.value

    if (!name || !config) return

    this.dialogBackendService.createGroup(name, config).subscribe({
      complete: () => {
        this.subsStateService.addGroup(name)
        this.observer.complete();
      }
    })
  }
}
