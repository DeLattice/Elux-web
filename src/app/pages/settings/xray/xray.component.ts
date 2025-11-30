import {ChangeDetectionStrategy, Component,} from '@angular/core';
import {XrayConfigEditorComponent} from '@app/components/xray-config-editor/xray-config-editor.component';

@Component({
  selector: 'app-xray',
  imports: [XrayConfigEditorComponent],
  templateUrl: './xray.component.html',
  styleUrl: './xray.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XrayComponent {

}
