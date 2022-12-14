import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Review } from 'src/shared/models';
import { UserMovieInteractionService } from 'src/shared/services';
import { REVIEW_MIN_LENGTH, REVIEW_TITLE_MIN_LENGTH } from '../constants';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewFormComponent implements OnChanges {
  @Input() movieId?: string;
  @Output() postReview = new EventEmitter<Review>();

  form = this.fb.group({
    rating: [null, Validators.required],
    title: [
      null,
      [Validators.required, Validators.minLength(REVIEW_TITLE_MIN_LENGTH)],
    ],
    review: [
      null,
      [Validators.required, Validators.minLength(REVIEW_MIN_LENGTH)],
    ],
  });

  constructor(
    private userMovieInteractionService: UserMovieInteractionService,
    private fb: FormBuilder,
  ) {}

  ngOnChanges(): void {
    this.form.reset();
    this.userMovieInteractionService
      .getRating$(this.movieId!)
      .subscribe(rating => {
        if (rating) {
          this.form.patchValue({ rating: rating / 2 }, { emitEvent: false });
        }
      });
  }

  submit() {
    const review = this.form.getRawValue();
    this.postReview.next(review);
    this.form.reset();
  }
}
