import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user/user";
import { UserGenresStats } from "../models/user/user-genre-stats";
import { UserStats } from "../models/user/user-stats";
import { UserTopEntry } from "../models/user/user-top-entry";
import { UserTopOption } from "../models/user/user-top-option";

export const IUserApiServiceToken = new InjectionToken('IUserApiService');

export interface IUserApiService {
  getUserById$(id: number): Observable<User | undefined>;
  getUserStats$(id: number): Observable<UserStats | undefined>;
  getUserGenresStats$(id: number): Observable<UserGenresStats[]>;
  getUserTop$(top: UserTopOption, limit: number): Observable<UserTopEntry[]>;

  follow$(userId: number): Observable<void>;
  unfollow$(userId: number): Observable<void>;
  getFollowing$(userId: number): Observable<User[]>;
  getFollowedBy$(userId: number): Observable<User[]>;
}