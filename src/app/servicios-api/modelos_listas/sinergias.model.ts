export interface Sinergia {

  id: number;

  nombre: string;

  descripcion: string;

  efecto: string;

  objetos: number[];

  tipo?: string;

  rareza?: string;

}

export interface SinergiasResponse {

  sinergias: Sinergia[];

}
