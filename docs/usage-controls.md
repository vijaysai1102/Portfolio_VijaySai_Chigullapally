# Durable usage controls

The release requires Upstash Redis REST credentials and explicit positive daily, monthly and per-session request caps. On 2026-11-15 the user approved up to $1 for testing and a $5 monthly public-Gemini target, with public caps of 25 requests/day, 250/month and 6/session. These values are saved privately in the intended Vercel environments; .env.example retains unconfigured defaults. The isolated preview uses a separate temporary Redis database and a 150-request test cap to allow corrected-case reruns and browser checks within the approved testing allowance. Request caps bound requests, not an exact invoice or account-wide spending limit; provider billing controls and usage review remain necessary.

Every accepted question reserves all three counters in one Redis EVAL script before generation. All keys share a hash tag; the script checks every limit before incrementing any counter. Missing/invalid configuration, network timeout, failed HTTP, invalid Redis result or exhausted cap prevents a provider call. Provider failures/cancellation consume the reservation conservatively; no automatic paid retry or refund race exists. No process-local fallback exists.

Session identity is a random UUID cookie, HttpOnly, SameSite=Strict, host-only, scoped to /api/chat, Secure for HTTPS, expiring after one hour. Resetting chat does not reset allowance. Removing cookies can bypass per-session throttling; global daily/monthly counters still cap paid calls. This is cost containment rather than a full bot-defense service; a visitor could consume shared allowance. No IP address or conversation text is stored in Redis. Session quota keys expire after an hour; global day/month counts expire after 2/35 days. Date buckets use UTC. Redis must permit EVAL, GET, INCR and EXPIRE.

Deterministic adapter tests establish refusal, outage handling, result validation and allowance presentation. The live isolated-store checks below now also execute the actual Lua script on Redis. Before public release, repeat relevant checks against the final preview configuration and complete browser/provider journeys. Never share production quota keys between an integration test and public traffic. Current source uses the portfolio namespace; provision a separate preview database.

## Live isolated-store review — 2026-11-15

Ran the application's unchanged reserveUsage adapter against a newly provisioned, free 72-hour Upstash scratch database. It contains synthetic counters only; production storage was not accessed. Credentials, temporary scripts and raw results stay under ignored .agent-guidance/. This database expires on 2026-11-18 and is not production infrastructure.

| Check | Observed result |
| --- | --- |
| Independent-process daily race | Four separate Node processes made 20 concurrent attempts against a daily cap of 5: exactly 5 accepted, 15 refused; actual day and month counters were both 5. |
| Session race | 20 simultaneous attempts against a session cap of 3: exactly 3 accepted, 17 refused; day, month and session counters were all 3. |
| Monthly race | 20 simultaneous attempts across two day buckets against a monthly cap of 7: exactly 7 accepted, 13 refused; monthly count and summed daily counts were both 7. |
| Actual expiry settings | Redis TTL reported 172799, 3023999 and 3599 seconds for day, month and session keys, consistent with configured 2-day, 35-day and 1-hour lifetimes. |
| Controlled expiry | Shortened only the three isolated test keys to 100ms, verified their disappearance, then reserved again: all counters restarted at 1. This is not a full-lifetime wall-clock wait. |
| UTC day/month rollover | Injected instants on either side of a month boundary; real Redis stored separate day/month buckets while preserving the same session counter at 2. |
| Store failure/recovery | Invalid Redis credentials and an unreachable endpoint each failed closed with 503; restoring the valid isolated configuration allowed reservation. |
| Real provider failure accounting | Invoked the API handler with the real Gemini endpoint, deliberately invalid test key and real scratch Redis. The NDJSON stream reported a provider-unavailable error with no answer/done event or credential exposure. Redis daily count increased by exactly one, preserving conservative accounting. |

The provider-failure check invoked the real handler and services from Node, not a deployed HTTP endpoint or browser. It does not establish valid Gemini authentication, model quality, cancellation, safety/quota responses, public preview behavior or a production spending ceiling. Initial temporary-check assertions required correction for the Host header and nonessential error wording; application code did not require changes. No valid-key generation or paid model answer was performed.

Official contracts reviewed: [Upstash REST](https://upstash.com/docs/redis/features/restapi), [EVAL](https://upstash.com/docs/redis/sdks/ts/commands/scripts/eval), [Redis script execution](https://redis.io/docs/latest/develop/interact/programmability/). No storage resource was created and no live paid call was made.
