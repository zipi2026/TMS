import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';

export interface Message {
  topic: string;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent> = new AnonymousSubject<MessageEvent>();
  messages: Subject<Message> = new Subject<Message>();

  init(url: string) {
    this.subject = this.create(url);
    this.messages = this.subject.pipe(
      map((response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return data;
      })
    ) as Subject<Message>;
  }

  connect(url: string): AnonymousSubject<MessageEvent> {
    this.subject = this.create(url);
    console.log('Successfully connected: ' + url);
    return this.subject;
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    console.log('WebSocket URL:', url);

    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    const observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    const observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return new AnonymousSubject<MessageEvent>(observer as any, observable);
  }
}