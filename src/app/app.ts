import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  title = 'Lista de Personas Registradas';
  personas: any[] = [];

  private apiUrl = 'https://localhost:7134/api/persona';

  // Inyectamos el ChangeDetectorRef en el constructor
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.obtenerPersonas();
  }

  obtenerPersonas() {
    const headers = new HttpHeaders({
      'X-Api-Key': 'MiSuperClaveSecreta123'
    });

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.personas = data;

        // CORRECCIÓN: Forzamos a Angular a redibujar la tabla de inmediato
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al conectar con la API:', err);
      }
    });
  }
}
