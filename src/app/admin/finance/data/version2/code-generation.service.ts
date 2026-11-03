import { Injectable } from "@angular/core";
import { IClasse, ICompte, IRubrique, ISousCompte, PARAMETRAGE_FINANCE } from "./finance.params.service";


@Injectable({
  providedIn: 'root'
})
export class CodeGenerationService {
  private data: IClasse[] = PARAMETRAGE_FINANCE;

  generateCompteCode(classId: string): string {
    const classe = this.data.find(c => c.id === classId);
    if (!classe) {
      throw new Error('Classe not found');
    }

    const prefix = classe.code;
    const startSuffix = '0';

    if (classe.comptes.length === 0) {
      const newCode = prefix + startSuffix;
      return newCode;
    }

    const maxCode = Math.max(...classe.comptes.map(c => Number(c.code)));
    let newNumber = maxCode + 1;
    let newCode = newNumber.toString();

    if (!newCode.startsWith(prefix)) {
      throw new Error('No available code for this classe');
    }

    while (classe.comptes.some(c => c.code === newCode)) {
      newNumber++;  
      newCode = newNumber.toString();
      if (!newCode.startsWith(prefix)) {
        throw new Error('No available code for this classe');
      }
    }

    return newCode;
  }

  generateSousCompteCode(compteId: string): string {
    const compte = this.findCompte(compteId);
    if (!compte) {
      throw new Error('Compte not found');
    }

    const prefix = compte.code;
    const startSuffix = '0';

    if (compte.sousComptes.length === 0) {
      const newCode = prefix + startSuffix;
      return newCode;
    }

    const maxCode = Math.max(...compte.sousComptes.map(sc => Number(sc.code)));
    let newNumber = maxCode + 1;
    let newCode = newNumber.toString();

    if (!newCode.startsWith(prefix)) {
      throw new Error('No available code for this compte');
    }

    while (compte.sousComptes.some(sc => sc.code === newCode)) {
      newNumber++;
      newCode = newNumber.toString();
      if (!newCode.startsWith(prefix)) {
        throw new Error('No available code for this compte');
      }
    }

    return newCode;
  }

  generateRubriqueCode(sousCompteId: string): string {
    const sousCompte = this.findSousCompte(sousCompteId);
    if (!sousCompte) {
      throw new Error('Sous-compte not found');
    }

    const prefix = sousCompte.code;
    const startSuffix = '00';

    if (sousCompte.rubriques.length === 0) {
      const newCode = prefix + startSuffix;
      return newCode;
    }

    const maxCode = Math.max(...sousCompte.rubriques.map(r => Number(r.code)));
    let newNumber = maxCode + 1;
    let newCode = newNumber.toString();

    if (!newCode.startsWith(prefix)) {
      throw new Error('No available code for this sous-compte');
    }

    while (sousCompte.rubriques.some(r => r.code === newCode)) {
      newNumber++;
      newCode = newNumber.toString();
      if (!newCode.startsWith(prefix)) {
        throw new Error('No available code for this sous-compte');
      }
    }

    return newCode;
  }

  private findCompte(id: string): ICompte | null {
    for (const classe of this.data) {
      const compte = classe.comptes.find(c => c.id === id);
      if (compte) {
        return compte;
      }
    }
    return null;
  }

  private findSousCompte(id: string): ISousCompte | null {
    for (const classe of this.data) {
      for (const compte of classe.comptes) {
        const sousCompte = compte.sousComptes.find(sc => sc.id === id);
        if (sousCompte) {
          return sousCompte;
        }
      }
    }
    return null;
  }
}