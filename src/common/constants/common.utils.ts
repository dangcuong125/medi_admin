import dayjs from 'dayjs';

export function toQueryString(objParams: Object) {
  const str = [];
  for (const p in objParams) {
    if (
      Object.prototype.hasOwnProperty.call(objParams, p) &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      objParams[p] + ''
    ) {
      str.push(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        `${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`
      );
    }
  }

  return str.join('&');
}

export function toUrl(url: string, query: object) {
  return `${url}?${toQueryString(query)}`;
}

export function getMessError(message: string | string[]) {
  if (typeof message === 'string') {
    return message;
  }
  return message[0] || 'Lỗi không xác định!';
}

export function getUniqueArray(originArray: (string | number)[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [...new Set(originArray)];
}
export function formatDate(date: string, format?: string) {
  return dayjs(date).format(format || 'DD/MM/YYYY HH:mm');
}
export function replacePathParams(path: string, newData: object): string {
  let newPath = path;
  Object.keys(newData).forEach((it) => {
    // @ts-ignore
    newPath = newPath.replace(`:${it}`, newData[it]);
  });
  return newPath;
}
