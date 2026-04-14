# How Latency Actually Works (And Why It Dominates Everything)

You can't optimize what you don't measure. And in distributed systems, latency is the measurement that matters most.

Everyone talks about throughput, scalability, and reliability. But latency is the silent killer that determines whether your system feels fast or slow to users.

The problem? Most engineers misunderstand how latency actually works.

## The Latency Math That Matters

Latency isn't just "response time." It's a distribution.

Consider a simple API call:
- 50% of requests: 100ms
- 95% of requests: 500ms
- 99% of requests: 2 seconds
- Worst case: 30 seconds

Your average latency might look great. But users experience the outliers.

In production, it's the 99th percentile that kills you.

## Why Latency Compounds

Every network hop adds latency:

```
User → CDN → Load Balancer → API Gateway → Service → Database
   50ms    20ms        10ms         15ms       50ms     100ms
```

Total: 245ms average. But in reality:

- Network jitter: +50ms variance
- Queueing delays: +200ms under load
- Database locks: +500ms during peaks
- Cross-region calls: +100ms minimum

Suddenly your 245ms average becomes 1-2 seconds for many users.

## The Production Latency Killers

1. **Queueing theory** - Little's Law means waiting in queues dominates
2. **Head-of-line blocking** - One slow request blocks everything
3. **Network physics** - Speed of light limits cross-region performance
4. **Resource contention** - CPU, memory, I/O fights create bottlenecks

## Measuring What Matters

Stop measuring averages. Measure:

- P50, P95, P99 latencies
- Request queue depths
- Error rates by latency bucket
- Time to first byte vs total response time

## The Latency Budget Mindset

Every system has a total latency budget. Spend it wisely:

- Network: 30-50%
- Serialization: 10-20%
- Business logic: 20-40%
- Database: 20-30%

Exceed any component, and the whole system suffers.

## Real-World Latency Tradeoffs

In production, you choose:

- Consistency vs availability (CAP theorem)
- Strong vs eventual consistency
- Synchronous vs asynchronous processing
- Local vs distributed state

Each choice affects latency. Each has production consequences.

## Going Deeper

If you want to master latency in production systems, my book breaks down the real tradeoffs and measurement strategies that work.

[Read: Production System Design](https://techpressbooks.com/books/system-design-production)

---

*This post is part of our series on production engineering. Related: Why most system designs fail in production.*
