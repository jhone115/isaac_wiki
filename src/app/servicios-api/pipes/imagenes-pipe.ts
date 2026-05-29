import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenes',
  standalone: true
})
export class ImagenesPipe implements PipeTransform {

  transform(imagen: string | string[]): string[] {
    return Array.isArray(imagen) ? imagen : [imagen];
  }

}