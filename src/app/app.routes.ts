import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent as DashboardHeader} from './dashboard/components/header/header.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'header',
        component: DashboardHeader,
        outlet: 'header'
      }
    ]
  },

  {
    path: 'aaa',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'header',
        component: DashboardHeader,
        outlet: 'header'
      }
    ]
  }
];
