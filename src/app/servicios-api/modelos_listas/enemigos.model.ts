export interface Variante {

  id: string;

  nombre: string;

}

export interface Enemigo {

  id: string;

  nombre: string;

  descripcion: string;

  tipo: string;

  pisos: string[];

  ataques: string[];

  tags?: string[];

  variantes?: Variante[];

  dificultad?: string;

  enemigo_base?: Variante;

  boss_base?: Variante;

  imagen?: string | string[];

}

export interface EnemigosResponse {

  enemigos: Enemigo[];

  bosses: Enemigo[];

}