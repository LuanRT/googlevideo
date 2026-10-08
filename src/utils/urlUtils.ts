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

export function getNextFallbackUrl(input: string | URL): URL | undefined {
  const urlMod = input instanceof URL ? new URL(input.href) : new URL(input);

  const fvip = urlMod.searchParams.get('fvip');
  const mnRaw = urlMod.searchParams.get('mn');
  const fallbackCount = parseInt(
    urlMod.searchParams.get('fallback_count') ?? '0',
    10
  );

  if (fvip && mnRaw) {
    const mn = mnRaw.split(',');
    const nextIndex = fallbackCount + 1;

    if (nextIndex < mn.length && mn[nextIndex]) {
      const nextNode = mn[nextIndex];
      const currentHost = urlMod.hostname;
      const suffix = currentHost.replace(/^[^.]*/, '');
      const prefix = currentHost.startsWith('rr') ? 'rr' : 'r';

      urlMod.hostname = `${prefix}${fvip}---${nextNode}${suffix}`;
      urlMod.searchParams.set('fallback_count', String(fallbackCount + 1));

      return urlMod;
    }
  }

  return undefined;
}