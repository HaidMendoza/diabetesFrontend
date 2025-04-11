import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  mensajeActual: string = '';
  mensajes: { texto: string; tipo: 'usuario' | 'bot' }[] = [];

  @ViewChild('chatWindow') chatWindow!: ElementRef;

  enviarMensaje() {
    if (this.mensajeActual.trim()) {
      this.mensajes.push({ texto: this.mensajeActual, tipo: 'usuario' });

      setTimeout(() => {
        this.mensajes.push({ texto: '🤖 Hola, soy MediChamo Bot. ¿En qué puedo ayudarte?', tipo: 'bot' });
        this.scrollToBottom();
      }, 500);

      this.mensajeActual = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatWindow) {
        this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
