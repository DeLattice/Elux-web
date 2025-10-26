import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SubsComponent } from "./pages/subs/subs.component";
import { SettingsComponent } from "./pages/settings/settings.component";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "subs",
        component: SubsComponent,
      },
      {
        path: "settings",
        component: SettingsComponent,
      },
    ],
  },
];
