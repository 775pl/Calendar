export interface Availability {
    userId: string;
    date: string;
    status: 'disponible' | 'peut-etre' | 'indisponible';
  }