export interface Stat {
  tipo: string;
  cambio: string;
}

export interface Objeto {
  id: number;
  clave: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  efecto: string;

  stats?: Stat[];

  pools: string[];
  unlock: string;
}

export interface ObjetosResponse {
  objetos: Objeto[];
}