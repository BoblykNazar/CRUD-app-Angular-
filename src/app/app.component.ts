import { Component} from '@angular/core';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularApp';

  constructor ( private authService: AuthService ) {
    if (!this.authService.getUsers().length) {
      this.authService.addUser({ email: 'testUser@gmail.com', password: 'Testpass123!' });
    }
  };
}
