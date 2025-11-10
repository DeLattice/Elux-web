import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  XrayCoreConfigApplierComponent
} from '@app/components/navigation/header/xray-core-config-applier/xray-core-config-applier.component';
import {XrayCoreToggleComponent} from '@app/components/navigation/header/xray-core-toggle/xray-core-toggle.component';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  imports: [
    XrayCoreConfigApplierComponent,
    XrayCoreToggleComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {


}
