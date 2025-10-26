import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  TuiButton,
  TuiIcon,
  TuiTextfield, TuiTitle
} from '@taiga-ui/core';
import {TuiTooltip} from '@taiga-ui/kit';
import {TuiForm, TuiHeader} from '@taiga-ui/layout';
import {DialogBackendService} from '../dialog-backend.service';
import {injectContext} from '@taiga-ui/polymorpheus';
import {Observer} from 'rxjs';
import {TuiDialogContext} from '@taiga-ui/experimental';
import { SubsStateService } from '@app/pages/subs/subs.state';

@Component({
  selector: 'app-dialog-delete-group',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiButton,
    TuiForm,
    TuiHeader,
    TuiTitle,
  ],
  templateUrl: './dialog-delete-group.component.html',
  styleUrl: './dialog-delete-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDeleteGroupComponent {
  private readonly dialogBackendService = inject(DialogBackendService)
  private readonly subsStateService = inject(SubsStateService)
  public readonly context = injectContext<TuiDialogContext<void, string>>();
  private readonly observer: Observer<void> = this.context.$implicit;

  deleteGroup() {
    const groupName = this.subsStateService.selectedGroup()

    if(!groupName) return

    this.dialogBackendService.deleteGroup(groupName).subscribe({
      complete: () => {
        this.subsStateService.removeGroup(groupName)
        this.observer.complete();
      }
    })
  }
}
