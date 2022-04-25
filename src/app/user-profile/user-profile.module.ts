import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { TuiProgressModule } from '@taiga-ui/kit';
import { TuiPieChartModule } from '@taiga-ui/addon-charts';
import { UserPreviewModule } from '../user-preview/user-preview.module';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserStatisticsComponent
  ],
  imports: [
    CommonModule,
    TuiProgressModule,
    TuiPieChartModule,
    UserPreviewModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
