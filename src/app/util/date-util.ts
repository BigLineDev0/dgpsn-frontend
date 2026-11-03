export class DateUtils {
  /**
   * Convertit un timestamp (millisecondes) en chaîne de caractères formatée.
   * @param timestamp le timestamp à convertir
   * @param options options pour le format (facultatif)
   * @returns date formatée
   */
  static formatTimestamp(timestamp: number, locale: string = 'fr-FR', options?: Intl.DateTimeFormatOptions): string {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      ...options,
    });
  }
}
