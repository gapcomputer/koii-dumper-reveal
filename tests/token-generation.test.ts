import { describe, it, expect } from 'vitest';
import { calculateTokenGeneration, isDumpEligible } from '../src/utils/token-generation';

describe('Token Generation Calculation', () => {
  const currentTimestamp = Date.now();

  // Test basic token generation
  it('should calculate token generation for valid dump', () => {
    const result = calculateTokenGeneration({
      dumpAmount: 1000,
      totalSupply: 10000,
      dumpFrequency: 2,
      lastDumpTimestamp: currentTimestamp - (25 * 60 * 60 * 1000) // 25 hours ago
    });

    expect(result.generatedTokens).toBeGreaterThan(0);
    expect(result.eligibilityScore).toBeGreaterThan(0);
    expect(result.eligibilityScore).toBeLessThanOrEqual(1);
  });

  // Test dump eligibility
  it('should determine dump eligibility', () => {
    const eligibleResult = isDumpEligible({
      dumpAmount: 1000,
      totalSupply: 10000,
      dumpFrequency: 2,
      lastDumpTimestamp: currentTimestamp - (25 * 60 * 60 * 1000) // 25 hours ago
    });

    const ineligibleResult = isDumpEligible({
      dumpAmount: 0,
      totalSupply: 10000,
      dumpFrequency: 0,
      lastDumpTimestamp: currentTimestamp
    });

    expect(eligibleResult).toBe(true);
    expect(ineligibleResult).toBe(false);
  });

  // Test edge cases
  it('should handle zero and negative inputs', () => {
    expect(() => calculateTokenGeneration({
      dumpAmount: -100,
      totalSupply: 10000,
      dumpFrequency: 2,
      lastDumpTimestamp: currentTimestamp
    })).toThrow('Invalid input parameters');

    expect(() => calculateTokenGeneration({
      dumpAmount: 1000,
      totalSupply: 0,
      dumpFrequency: 2,
      lastDumpTimestamp: currentTimestamp
    })).toThrow('Invalid input parameters');
  });

  // Test token generation limits
  it('should cap token generation', () => {
    const result = calculateTokenGeneration({
      dumpAmount: 10000,
      totalSupply: 1000,
      dumpFrequency: 10,
      lastDumpTimestamp: currentTimestamp - (25 * 60 * 60 * 1000) // 25 hours ago
    });

    expect(result.generatedTokens).toBeLessThanOrEqual(1000);
    expect(result.eligibilityScore).toBeLessThanOrEqual(1);
  });
});