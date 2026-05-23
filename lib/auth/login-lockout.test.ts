import assert from "node:assert/strict";
import { describe, it, afterEach } from "node:test";
import {
  clearFailedLogins,
  isLoginLocked,
  recordFailedLogin,
  resetLoginLockoutStore,
} from "./login-lockout";

describe("login lockout", () => {
  afterEach(() => resetLoginLockoutStore());

  it("locks after max failures", () => {
    const email = "admin@test.com";
    const ip = "127.0.0.1";
    for (let i = 0; i < 5; i++) recordFailedLogin(email, ip);
    const status = isLoginLocked(email, ip);
    assert.equal(status.locked, true);
    assert.ok(status.retryAfterSec && status.retryAfterSec > 0);
  });

  it("clears on successful login path", () => {
    const email = "admin@test.com";
    const ip = "127.0.0.1";
    recordFailedLogin(email, ip);
    clearFailedLogins(email, ip);
    assert.equal(isLoginLocked(email, ip).locked, false);
  });
});
