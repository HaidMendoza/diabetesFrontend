import { Component, ViewChild, ElementRef } from '@angular/core';
import { CargaService } from '../../services/carga.service';  // Asegúrate de importar el servicio de carga
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  mensajeActual: string = '';
  mensajes: { texto: string; tipo: 'usuario' | 'bot' }[] = [];

  @ViewChild('chatWindow') chatWindow!: ElementRef;

  constructor(public cargaService: CargaService) {}  // Inyecta el servicio de carga

  enviarMensaje() {
    if (this.mensajeActual.trim()) {
      this.mensajes.push({ texto: this.mensajeActual, tipo: 'usuario' });

      // Muestra el indicador de carga antes de la respuesta del bot
      this.cargaService.mostrarCarga();

      setTimeout(() => {
        this.mensajes.push({ texto: '🤖 Hola, soy MediChamo Bot. ¿En qué puedo ayudarte?', tipo: 'bot' });
        this.scrollToBottom();

        // Oculta el indicador de carga después de que el bot haya respondido
        this.cargaService.ocultarCarga();
      }, 2000);  // Puedes ajustar el tiempo de espera para simular la respuesta del bot

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
