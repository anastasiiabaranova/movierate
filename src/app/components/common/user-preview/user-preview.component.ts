import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from 'src/shared/models';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent {
  @Input() user!: User;
}
