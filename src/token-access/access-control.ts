/**
 * Token Generation Access Control System
 * Manages permissions and access for token generation
 */
export enum UserRole {
  ADMIN = 'admin',
  STANDARD = 'standard',
  RESTRICTED = 'restricted'
}

export interface User {
  id: string;
  role: UserRole;
}

export class TokenGenerationAccessControl {
  private static ADMIN_TOKEN_GENERATION_LIMIT = 1000000;
  private static STANDARD_TOKEN_GENERATION_LIMIT = 10000;
  private static RESTRICTED_TOKEN_GENERATION_LIMIT = 100;

  /**
   * Check if user is authorized to generate tokens
   * @param user User attempting token generation
   * @param requestedTokenAmount Number of tokens requested
   * @returns Boolean indicating if token generation is authorized
   */
  public static isTokenGenerationAuthorized(
    user: User, 
    requestedTokenAmount: number
  ): boolean {
    if (!user) {
      return false;
    }

    switch (user.role) {
      case UserRole.ADMIN:
        return requestedTokenAmount <= this.ADMIN_TOKEN_GENERATION_LIMIT;
      case UserRole.STANDARD:
        return requestedTokenAmount <= this.STANDARD_TOKEN_GENERATION_LIMIT;
      case UserRole.RESTRICTED:
        return requestedTokenAmount <= this.RESTRICTED_TOKEN_GENERATION_LIMIT;
      default:
        return false;
    }
  }

  /**
   * Get maximum token generation limit for a given role
   * @param role User role
   * @returns Maximum token generation limit
   */
  public static getTokenGenerationLimit(role: UserRole): number {
    switch (role) {
      case UserRole.ADMIN:
        return this.ADMIN_TOKEN_GENERATION_LIMIT;
      case UserRole.STANDARD:
        return this.STANDARD_TOKEN_GENERATION_LIMIT;
      case UserRole.RESTRICTED:
        return this.RESTRICTED_TOKEN_GENERATION_LIMIT;
      default:
        return 0;
    }
  }
}