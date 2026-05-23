import assert from "node:assert/strict";
import { describe, it, afterEach } from "node:test";
import { checkRateLimit, resetRateLimitStores } from "./rate-limit";

describe("checkRateLimit", () => {
  afterEach(() => resetRateLimitStores());

  it("allows requests under the limit", () => {
    const r1 = checkRateLimit("test", "ip-1", 3, 60_000);
    const r2 = checkRateLimit("test", "ip-1", 3, 60_000);
    assert.equal(r1.ok, true);
    assert.equal(r2.ok, true);
  });

  it("blocks after limit exceeded", () => {
    checkRateLimit("test", "ip-2", 2, 60_000);
    checkRateLimit("test", "ip-2", 2, 60_000);
    const r3 = checkRateLimit("test", "ip-2", 2, 60_000);
    assert.equal(r3.ok, false);
    if (!r3.ok) assert.ok(r3.retryAfterSec > 0);
  });

  it("isolates keys", () => {
    checkRateLimit("test", "a", 1, 60_000);
    const blocked = checkRateLimit("test", "a", 1, 60_000);
    const other = checkRateLimit("test", "b", 1, 60_000);
    assert.equal(blocked.ok, false);
    assert.equal(other.ok, true);
  });
});
