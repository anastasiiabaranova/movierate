import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMainListsApiService, IMainListsApiServiceToken, IUserListsApiService, IUserListsApiServiceToken } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    @Inject(IMainListsApiServiceToken)
    private mainListApiService: IMainListsApiService,
    @Inject(IUserListsApiServiceToken)
    private userListApiService: IUserListsApiService
  ) { }

  getPopular$(): Observable<MoviesList> {
    return this.mainListApiService.getPopular$();
  }

  getUpcoming$(): Observable<MoviesList> {
    return this.mainListApiService.getUpcoming$();
  }

  getTopRated$(): Observable<MoviesList> {
    return this.mainListApiService.getTopRated$();
  }


  getAllListsCurrent$(): Observable<MoviesList[]> {
    return this.userListApiService.getAllListsCurrent$();
  }

  getAllUserLists$(userId: number): Observable<MoviesList[]> {
    return this.userListApiService.getAllUserLists$(userId);
  }

  getList$(listId: number): Observable<MoviesList> {
    return this.userListApiService.getList$(listId);
  }

  createList$(listName: string, isPublic: boolean): Observable<MoviesList> {
    return this.userListApiService.createList$(listName, isPublic);
  }

  addMovieToList$(movieId: string, listId: number): Observable<void> {
    return this.userListApiService.addMovieToList$(movieId, listId);
  }

}
