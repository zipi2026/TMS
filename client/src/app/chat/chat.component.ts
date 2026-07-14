import { AfterViewInit, Component, inject, OnInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MessageService } from '../services/http/message.service';
import { ChatMessagePipe } from '../pipes/chat-message.pipe';
import { AuthStateService } from '../services/auth-state.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports:[
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ChatMessagePipe
  ]
})
export class ChatComponent implements OnInit , AfterViewInit{

  num = 0;
  open = false;
  input = '';
  messages: { text: string; sender: string }[] = [{ text: 'שלום! איך אפשר לעזור לך?', sender: '' }];
  private messagService = inject(MessageService);
  private authState = inject(AuthStateService);

  get currentUserName(): string {
    return this.authState.currentUser?.userName || '';
  }

  ngOnInit(): void {
    this.num = Math.random();
  }

  ngAfterViewInit(): void {
  }

  send() {
    if (!this.input.trim()) return;

    const userName = this.authState.currentUser?.userName || '';

    // Add message locally immediately with the real user name
    this.messages.push({ text: this.input, sender: userName });
    this.updateStyle();

    this.messagService.sendMessage$(userName, this.input).subscribe();
    this.input = '';
  }

  addMessage(userName: string | null | undefined, message: string | null | undefined) {
    const safeUserName = userName || '';
    const safeMessage = message || '';

    // Don't add duplicate — the sender already has their message added locally
    const currentUserName = this.authState.currentUser?.userName || '';
    if (safeUserName === currentUserName && this.messages.length > 0) {
      const lastMsg = this.messages[this.messages.length - 1];
      if (lastMsg.text === safeMessage && lastMsg.sender === currentUserName) {
        return; // skip duplicate
      }
    }

    this.messages.push({ text: safeMessage, sender: safeUserName });
    this.updateStyle();
  }

  updateStyle(){
    let elements = document.getElementsByClassName("chat-message");
    for(let el of elements){
      el.innerHTML = (el.textContent || '').replace(/&&\s*(.*?)\s*&&/, '<span class="bold">$1</span>');
    }
  }

  openChat(){
    this.num = Math.random();
    this.open = true;
  }

  closeChat(){
    this.open = false;
  }
}
