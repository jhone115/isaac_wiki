export interface Pickup {

  id: number;

  clave: string;

  nombre: string;

  descripcion: string;

  tipo: string;

  efecto: string;

  unlock: string;

  pools?: string[];

  stackeable?: boolean;

  consumible?: boolean;

  rareza?: string;

  imagen?: string;

}

export interface PickupsResponse {

  pickups: Pickup[];

}