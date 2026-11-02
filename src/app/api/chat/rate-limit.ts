
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';

let perIp: Ratelimit;
let globalDaily: Ratelimit;

function getLimiters() {
  if (!perIp || !globalDaily) {
    const redis = Redis.fromEnv();

    perIp = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(8, '1 m'),
      prefix: 'sniff:assistant:ip',
      analytics: false,
    });

    globalDaily = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(200, '1 d'),
      prefix: 'sniff:assistant:daily',
      analytics: false,
    });
  }

  return { perIp, globalDaily };
}

export async function checkAssistantRateLimit(
  req: NextRequest,
): Promise<NextResponse | null> {
  const secret = process.env.ASSISTANT_IP_HASH_SECRET;
  const header = process.env.ASSISTANT_TRUSTED_IP_HEADER;

  const configured =
    !!process.env.UPSTASH_REDIS_REST_URL &&
    !!process.env.UPSTASH_REDIS_REST_TOKEN &&
    !!secret &&
    secret.length >= 16 &&
    !!header;

  if (!configured) {
    if (process.env.NODE_ENV !== 'production') {
      return null; // Local development only
    }

    return NextResponse.json(
      { text: 'Assistant unavailable', products: [] },
      { status: 503 },
    );
  }

  try {
    const { perIp, globalDaily } = getLimiters();

    // Only trust a header set by your hosting provider.
    const rawIp = req.headers.get(header)?.trim() ?? '';
    const ip = isIP(rawIp) ? rawIp : 'unknown';

    const key = createHmac('sha256', secret)
      .update(ip)
      .digest('hex');

    const limits = [
      await perIp.limit(key),
    ];

    if (
      limits[0].reason === 'timeout' ||
      !limits[0].success
    ) {
      if (limits[0].reason !== 'timeout') {
        return NextResponse.json(
          { text: 'Too many messages. Try again soon!', products: [] },
          { status: 429 },
        );
      }

      throw new Error('Rate limiter timeout');
    }

    const daily = await globalDaily.limit('all');

    if (daily.reason === 'timeout') {
      throw new Error('Daily limiter timeout');
    }

    if (!daily.success) {
      return NextResponse.json(
        { text: 'Fei Fei is taking a break. 🐾', products: [] },
        { status: 429 },
      );
    }

    return null;
  } catch {
    return NextResponse.json(
      { text: 'Assistant temporarily unavailable', products: [] },
      { status: 503 },
    );
  }
}