export interface Trinket {

  id: number;

  clave: string;

  nombre: string;

  descripcion: string;

  efecto: string;

  unlock: string;

  tipo?: string;

  stackeable?: boolean;

  rareza?: string;

}

export interface TrinketsResponse {

  trinkets: Trinket[];

}