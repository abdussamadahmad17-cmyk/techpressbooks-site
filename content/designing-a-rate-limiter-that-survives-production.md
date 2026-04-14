# Designing a Rate Limiter That Survives Production

Rate limiting seems simple: "Don't let clients make too many requests." But in production, it's where theory meets reality.

You implement a basic token bucket. It works in testing. Then production hits:

- Traffic spikes 100x normal
- Distributed clients coordinate attacks
- Network partitions cause thundering herd
- Configuration changes break everything
- Monitoring gives false signals

Suddenly your "simple" rate limiter is the system bottleneck.

## The Rate Limiting Reality Check

Most rate limiters fail because they assume:

- Clients are well-behaved
- Traffic is evenly distributed
- State is consistent across instances
- Configuration never changes
- Failures are graceful

Production demands:

- Handle malicious clients
- Distribute load across instances
- Survive network partitions
- Update configuration safely
- Degrade gracefully under load

## Building a Production-Ready Rate Limiter

### 1. Choose the Right Algorithm

**Token Bucket** - Good for burst handling, but stateful
**Leaky Bucket** - Smooth traffic, but queue buildup
**Fixed Window** - Simple, but boundary issues
**Sliding Window** - Accurate, but expensive
**Multi-layer** - Combine approaches for different scenarios

### 2. Handle Distribution

In a distributed system:

- Use Redis for shared state
- Implement eventual consistency
- Handle network partitions
- Avoid single points of failure

### 3. Account for Real-World Traffic

- **Bursty traffic** - Allow reasonable bursts
- **Coordinated attacks** - Detect patterns across clients
- **Legitimate spikes** - Differentiate from attacks
- **Slow loris** - Handle slow, long-lived connections

### 4. Implement Proper Monitoring

Track:

- Request rates by endpoint
- Rejection rates by client
- Queue depths and latencies
- Configuration changes
- System resource usage

### 5. Plan for Failure Modes

- **Over-limiting** - False positives hurt users
- **Under-limiting** - System overload
- **State loss** - Redis failures, memory issues
- **Configuration errors** - Wrong limits break features

## A Practical Rate Limiter Design

```typescript
class ProductionRateLimiter {
  private redis: RedisClient;
  private config: RateLimitConfig;

  async checkLimit(clientId: string, endpoint: string): Promise<boolean> {
    const key = `rate_limit:${endpoint}:${clientId}`;
    const now = Date.now();

    // Use sliding window for accuracy
    const windowStart = now - this.config.windowMs;

    // Clean old entries
    await this.redis.zremrangebyscore(key, 0, windowStart);

    // Count current requests
    const requestCount = await this.redis.zcard(key);

    if (requestCount >= this.config.maxRequests) {
      return false;
    }

    // Add current request
    await this.redis.zadd(key, now, `${now}-${Math.random()}`);
    await this.redis.expire(key, this.config.windowMs / 1000);

    return true;
  }
}
```

## The Rate Limiting Tradeoffs

- **Accuracy vs Performance** - Exact counting costs CPU/memory
- **Consistency vs Availability** - Strong consistency requires coordination
- **Security vs Usability** - Strict limits hurt legitimate users
- **Simplicity vs Flexibility** - Complex rules are hard to operate

## Going Deeper

For the complete rate limiting system design, including distributed coordination and failure handling, see my book.

[Read: Production System Design](https://techpressbooks.com/books/system-design-production)

---

*This post is part of our series on system design. Related: What breaks first in a distributed system.*
