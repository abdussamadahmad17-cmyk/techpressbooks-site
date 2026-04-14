# Why Your Detection Rules Don't Work

You spend weeks crafting the perfect detection rule. You test it against historical data. It catches all the known attacks. You deploy it to production with confidence.

Then it happens: False positives flood your SIEM. Real threats slip through undetected. Alert fatigue sets in. Your team starts ignoring everything.

Why? Because detection engineering has a reality gap.

## The Detection Engineering Reality

Your rule works perfectly in the lab because:

- You have complete, clean data
- You know exactly what to look for
- There are no timing issues
- Dependencies never fail
- Scale doesn't matter

Production detection looks like:

- Incomplete, noisy data streams
- Unknown attack patterns
- Network delays and drops
- System failures and gaps
- Millions of events per minute

The gap between these worlds breaks most detection rules.

## What Actually Breaks Detection

1. **Data quality issues** - Missing fields, malformed logs, encoding problems
2. **Timing dependencies** - Events arrive out of order, with delays, or not at all
3. **Scale problems** - Rules that work on 1000 events fail on 100 million
4. **Context gaps** - Rules assume complete visibility but miss cross-system signals
5. **Alert thresholds** - Too sensitive creates noise, too loose misses threats

## The Detection Rule Lifecycle

Most rules follow this pattern:

**Phase 1: Perfect (Development)**
- Catches everything
- Zero false positives
- Fast execution

**Phase 2: Noisy (Early Production)**
- False positives appear
- Performance degrades
- Tuning begins

**Phase 3: Broken (Late Production)**
- Too many alerts, ignored
- Real threats missed
- Rule disabled

**Phase 4: Forgotten**
- Never updated
- Becomes technical debt

## Building Rules That Survive

Successful detection rules:

- **Handle missing data** - Use optional fields, defaults, error handling
- **Account for timing** - Use windows, buffers, state management
- **Scale efficiently** - Avoid expensive operations, use approximations
- **Include context** - Combine multiple signals, use baselines
- **Have escape valves** - Circuit breakers, rate limits, manual overrides

## The Detection Maturity Model

**Level 1: Alert Engineering**
- Rules trigger alerts
- Focus on catching known threats
- High false positive rates

**Level 2: Detection Engineering**
- Rules provide context
- Reduce false positives
- Enable investigation

**Level 3: Threat Engineering**
- Rules drive response
- Integrate with automation
- Focus on impact

## Going Deeper

If you want to build detection systems that actually work in production, my book covers the practical frameworks and mental models.

[Read: Practical Threat Detection Engineering](https://techpressbooks.com/books/threat-detection-engineering)

---

*This post is part of our series on detection engineering. Related: Designing a rate limiter that survives production.*
