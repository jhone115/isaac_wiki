export interface Vida {

  tipo: string;
  cantidad: number;
}

export interface Consumible {

  tipo: string;
  cantidad: number;
}

export interface Stats {

  danio: number;
  lagrimas: number;
  vellagrimas: number;
  rango: number;
  velocidad: number;
  suerte: number;
}

export interface Personaje {

  id?: string;

  nombre: string;

  imagen: string | string[];

  vida: Vida[];

  danio: number;
  lagrimas: number;
  vellagrimas: number;
  rango: number;
  velocidad: number;
  suerte: number;

  descripcioncorta: string;
  descripcionlarga: string;

  consumibles?: Consumible[];

  objetos?: string;
}