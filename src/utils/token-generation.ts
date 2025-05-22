/**
 * Token Generation Calculation Module
 * 
 * This module provides logic for calculating token generation 
 * based on token dumping behaviors.
 */

interface TokenGenerationParams {
  dumpAmount: number;
  totalSupply: number;
  dumpFrequency: number;
  lastDumpTimestamp: number;
}

interface TokenGenerationResult {
  generatedTokens: number;
  eligibilityScore: number;
}

/**
 * Calculate token generation based on dumping behavior
 * 
 * @param params - Parameters for token generation calculation
 * @returns TokenGenerationResult containing generated tokens and eligibility score
 */
export function calculateTokenGeneration(params: TokenGenerationParams): TokenGenerationResult {
  const { 
    dumpAmount, 
    totalSupply, 
    dumpFrequency, 
    lastDumpTimestamp 
  } = params;

  // Validate input parameters
  if (dumpAmount < 0 || totalSupply <= 0 || dumpFrequency < 0) {
    throw new Error('Invalid input parameters for token generation');
  }

  // Calculate dump intensity
  const dumpIntensity = dumpAmount / totalSupply;

  // Calculate time-based multiplier (prevents repeated dumps)
  const currentTimestamp = Date.now();
  const timeSinceLastDump = currentTimestamp - lastDumpTimestamp;
  const timeMultiplier = Math.min(1, timeSinceLastDump / (24 * 60 * 60 * 1000)); // 24-hour cooldown

  // Calculate eligibility score
  const eligibilityScore = Math.min(
    1, 
    dumpIntensity * dumpFrequency * timeMultiplier
  );

  // Calculate generated tokens (max 10% of dump amount)
  const generatedTokens = Math.floor(
    dumpAmount * eligibilityScore * 0.1
  );

  return {
    generatedTokens,
    eligibilityScore
  };
}

/**
 * Check if a dump is eligible for token generation
 * 
 * @param params - Parameters for token generation calculation
 * @returns boolean indicating eligibility
 */
export function isDumpEligible(params: TokenGenerationParams): boolean {
  try {
    const { eligibilityScore } = calculateTokenGeneration(params);
    return eligibilityScore > 0;
  } catch {
    return false;
  }
}