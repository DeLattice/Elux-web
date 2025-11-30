import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiAccordionDirective, TuiAccordionItem} from '@taiga-ui/kit';
import {TuiButton, TuiTextfieldOptionsDirective} from '@taiga-ui/core';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-xray-config-editor-node',
  imports: [
    ReactiveFormsModule,
    TuiAccordionItem,
    TuiAccordionDirective,
    TuiTextfieldOptionsDirective,
    TuiButton,
    NgTemplateOutlet
  ],
  templateUrl: './xray-config-editor-node.component.html',
  styleUrl: './xray-config-editor-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XrayConfigEditorNodeComponent {

}
