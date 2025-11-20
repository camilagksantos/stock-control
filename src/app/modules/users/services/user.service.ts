import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/environment';
import { Observable } from 'rxjs';
import { IAuthRequest, IAuthResponse, ISignUpRequest, IUser } from 'src/app/models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.API_URL}/users`, this.httpOptions);
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.API_URL}/users/${userId}`, this.httpOptions);
  }

  signUp(userData: ISignUpRequest): Observable<IUser> {
    return this.http.post<IUser>(`${this.API_URL}/users`, userData, this.httpOptions);
  }

  updateUser(userId: number, userData: Partial<ISignUpRequest>): Observable<IUser> {
    return this.http.put<IUser>(`${this.API_URL}/users/${userId}`, userData, this.httpOptions);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/users/${userId}`, this.httpOptions);
  }

  authenticate(credentials: IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(
      `${this.API_URL}/users/auth`,
      credentials,
      this.httpOptions
    );
  }
}