import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChatService } from '../../services/chat.service';

interface Message {
  content: string;
  sender: 'U' | 'AS';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  messages: Message[] = [];
  newMessage: string = '';
  isLoading: boolean = false;

  constructor(private chatService: ChatService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  async sendMessage() {
    if (!this.newMessage.trim()) return;

    // Add user message
    this.messages.push({
      content: this.newMessage,
      sender: 'U',
      timestamp: new Date()
    });

    const userQuestion = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;

    try {
      const response = await this.chatService.getAnswer(userQuestion);
      this.messages.push({
        content: response,
        sender: 'AS',
        timestamp: new Date()
      });
    } catch (error) {
      this.messages.push({
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'AS',
        timestamp: new Date()
      });
    } finally {
      this.isLoading = false;
    }
  }
}
