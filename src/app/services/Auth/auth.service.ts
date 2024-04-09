import { Injectable } from '@angular/core';
import { User } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly STORAGE_KEY = 'users';

  constructor() { }

  getUsers(): User[] {
    const usersJson = localStorage.getItem(this.STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  getUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  }

  login(email: string, password: string): boolean {
    const user = this.getUserByEmail(email);
    if (user && user.password === password) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  getCurrentUser(): User | null {
    const currentUserJson = localStorage.getItem('currentUser');
    return currentUserJson ? JSON.parse(currentUserJson) : null;
  }

  addUser(user: User): void {
    let users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
