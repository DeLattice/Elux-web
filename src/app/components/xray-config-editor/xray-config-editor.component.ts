import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {finalize} from 'rxjs';
import {TuiAlertService, TuiButton, TuiLoader} from '@taiga-ui/core';
import {
  XrayConfigEditorNodeComponent
} from '@app/components/xray-config-editor/xray-config-editor-node/xray-config-editor-node.component';
import {XrayService} from '@app/services/xray.service';
import {JsonPipe, NgForOf, NgTemplateOutlet} from '@angular/common';

const initialData = {
  "inbounds": [
    {
      "listen": "0.0.0.0",
      "port": 43765,
      "protocol": "socks",
      "settings": {
        "auth": "noauth",
        "udp": true
      },
      "tag": "socks-inbound"
    }
  ],
  "log": {
    "logLevel": "info"
  },
  "outbounds": [
    {
      "protocol": "vless",
      "settings": {
        "vnext": [
          {
            "address": "104.18.26.90",
            "port": 80,
            "users": [
              {
                "encryption": "none",
                "id": "6f690965-3be3-43bb-9331-3ead6efb20aa"
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "security": "none"
      },
      "tag": "1"
    },
    {
      "protocol": "vless",
      "settings": {
        "vnext": [
          {
            "address": "104.18.26.90",
            "port": 80,
            "users": [
              {
                "encryption": "none",
                "id": "6f690965-3be3-43bb-9331-3ead6efb20aa"
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "security": "none"
      },
      "tag": "2"
    }
  ],
  "routing": {
    "domainMatcher": "hybrid",
    "domainStrategy": "AsIs",
    "rules": []
  }
};

@Component({
  selector: 'app-xray-config-editor',
  imports: [

  ],
  templateUrl: './xray-config-editor.component.html',
  styleUrl: './xray-config-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XrayConfigEditorComponent {

}
