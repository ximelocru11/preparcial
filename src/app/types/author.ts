export interface Editorial {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial?: Editorial;  // opcional porque podría no venir
}
export interface Organization {
  id: number;
  name: string;
  tipo: string; // PUBLICA, PRIVADA, etc. (según tu JSON)
}

export interface Prize {
  id: number;
  name: string;
  description: string;
  premiationDate: string; // formato "YYYY-MM-DD"
  organization: Organization;
}

//Decido usar sin los atributos que no voy a usar para simplificar
export interface Author {
  id: number;
  birthDate: string;     
  name: string;
  description: string;
  image: string;    
} 
