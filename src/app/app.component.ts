import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, ChatComponent],
  standalone: true
})
export class AppComponent {
  title = 'Angular Chatbot';
}
