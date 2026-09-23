interface Range {
  start: number;
  end: number;
}

export function parseRangeHeader(rangeHeaderValue: string | undefined): Range | undefined {
  if (!rangeHeaderValue) return undefined;

  const parts = rangeHeaderValue.split('=')[1]?.split('-');
  if (parts?.length) {
    const start = Number(parts[0]);
    const end = Number(parts[1]);
    return { start, end };
  }

  return undefined;
}

export function getBroadcastId(url: URL): string | undefined {
  const idParam = url.searchParams.get('id');
  if (!idParam) return undefined;
  const parts = idParam.split('.');
  return parts.length === 2 ? parts[1] : undefined;
}