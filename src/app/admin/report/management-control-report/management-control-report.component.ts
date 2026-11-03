import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-control-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="placeholder-report">
      <div class="placeholder-icon">📊</div>
      <h2>Rapport de Contrôle de Gestion</h2>
      <p>Ce rapport contiendra:</p>
      <ul>
        <li>Analyse des écarts budgétaires</li>
        <li>Suivi des indicateurs de performance (KPI)</li>
        <li>Gestion des risques</li>
        <li>Audit Trail des transactions</li>
        <li>Rapprochements comptables</li>
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
export class ManagementControlReportComponent {}
