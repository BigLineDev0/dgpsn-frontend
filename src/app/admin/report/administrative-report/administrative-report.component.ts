import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrative-report',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  // templateUrl: './administrative-report.component.html',
  styleUrl: './administrative-report.component.scss',
  template: `
    <div class="placeholder-report">
      <div class="placeholder-icon">📈</div>
      <h2>Gestion administrative</h2>
      <p>Ce rapport contiendra:</p>
      <ul>
        <li>Rapports périodiques (mensuel, trimestriel, annuel) et des données de suivi des partenaires</li>
        <li>Tableaux de bord dynamiques et des indicateurs clés de performance</li>
        <li>Export vers Excel, PDF et Word</li>
        <li>Intégration des données de suivi des partenaires</li>
      </ul>
      <span class="status-badge">En cours de développement</span>
    </div>
  `,
  styles: [`
    .placeholder-report {
      padding: 60px 40px;
      text-align: center;
      max-width: 800px;
      margin: 0 auto;

      .placeholder-icon {
        font-size: 80px;
        margin-bottom: 20px;
      }

      h2 {
        color: #4f6c52;
        margin-bottom: 24px;
        font-size: 28px;
      }

      p {
        color: #666;
        font-size: 16px;
        margin-bottom: 20px;
      }

      ul {
        text-align: left;
        display: inline-block;
        margin-bottom: 30px;

        li {
          color: #555;
          padding: 8px 0;
          font-size: 15px;
        }
      }

      .status-badge {
        display: inline-block;
        padding: 10px 24px;
        background-color: #ff9800;
        color: white;
        border-radius: 24px;
        font-weight: 600;
        font-size: 14px;
      }
    }
  `]
})
export class AdministrativeReportComponent {

}
