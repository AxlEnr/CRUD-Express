export interface CrearResenaDTO {
  id_usuario: number;
  id_producto: number;
  calificacion?: number;
  comentario?: string;
  imagen_url?: string;
}
