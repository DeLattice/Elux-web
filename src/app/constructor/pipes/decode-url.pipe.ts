import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeUrl'
})
export class DecodeUrlPipe implements PipeTransform {
  transform(value: string): string {
    return decodeMultipleUrl(value);
  }
}

function decodeMultipleUrl(encodedString: string, maxIterations: number = 10): string {
  if (!encodedString) {
    return '';
  }

  let decodedString = encodedString;
  let iterations = 0;

  try {
    while (iterations < maxIterations && decodedString.includes('%')) {
      const previousString = decodedString;
      decodedString = decodeURIComponent(decodedString);
      iterations++;

      if (decodedString === previousString) {
        break;
      }
    }
  } catch (error) {
    console.warn('Ошибка декодирования URL:', error);
  }

  return decodedString;
}
