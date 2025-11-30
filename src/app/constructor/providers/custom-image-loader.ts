import { ImageLoaderConfig } from "@angular/common";
import { isDevMode } from "@angular/core";
import {environment} from '../environments/environment';

// Эта функция остается без изменений
function addWidthToImageUrl(originalUrl: string, width: number): string {
  const lastDotIndex = originalUrl.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    const baseUrl = originalUrl.substring(0, lastDotIndex);
    const extension = originalUrl.substring(lastDotIndex);
    return `${baseUrl}-${width}w${extension}`;
  }
  return originalUrl;
}

export function customImageLoader(): (config: ImageLoaderConfig) => string {
  return (imageLoaderConfig: ImageLoaderConfig) => {
    const { src, width } = imageLoaderConfig;
    const protocol = src.split(":")[0];

    // 1. Пропускаем внешние URL
    if (protocol === "https" || protocol === "http") {
      return src;
    }

    // 2. Логика для режима разработки
    if (isDevMode()) {
      // Проверяем, содержит ли имя файла уже суффикс с шириной (например, "-571w.")
      const hasWidthSuffix = /-\d+w\./.test(src);

      // Если суффикс уже есть (путь пришел из srcset) ИЛИ нет ширины,
      // просто возвращаем исходный путь.
      if (hasWidthSuffix || !width) {
        return src;
      }

      // Если суффикса нет и есть ширина, добавляем его.
      // Это сработает для основного `ngSrc`.
      return addWidthToImageUrl(src, width);
    }

    // 3. Логика для production
    if (width) {
      return `${environment.apiUrl}/${src}?w=${width}`;
    }

    return `${environment.apiUrl}/${src}`;
  };
}
