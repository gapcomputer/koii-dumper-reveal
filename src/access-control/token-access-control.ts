/**
 * Token Generation Access Control Class
 * Manages access control for token generation
 */
export class TokenAccessControl {
    private allowedAddresses: Set<string>;
    private blacklistedAddresses: Set<string>;
    private tokenGenerationLimit: number;

    /**
     * Creates a new TokenAccessControl instance
     * @param allowedAddresses Initial list of addresses allowed to generate tokens
     * @param tokenGenerationLimit Maximum number of tokens that can be generated
     */
    constructor(
        allowedAddresses: string[] = [], 
        tokenGenerationLimit: number = 1000
    ) {
        this.allowedAddresses = new Set(allowedAddresses);
        this.blacklistedAddresses = new Set<string>();
        this.tokenGenerationLimit = tokenGenerationLimit;
    }

    /**
     * Add an address to the allowed list
     * @param address Wallet address to be allowed
     */
    addAllowedAddress(address: string): void {
        if (!this.isValidAddress(address)) {
            throw new Error('Invalid wallet address');
        }
        this.allowedAddresses.add(address);
    }

    /**
     * Remove an address from the allowed list
     * @param address Wallet address to be removed
     */
    removeAllowedAddress(address: string): void {
        this.allowedAddresses.delete(address);
    }

    /**
     * Blacklist an address from token generation
     * @param address Wallet address to be blacklisted
     */
    blacklistAddress(address: string): void {
        if (!this.isValidAddress(address)) {
            throw new Error('Invalid wallet address');
        }
        this.blacklistedAddresses.add(address);
    }

    /**
     * Check if an address is allowed to generate tokens
     * @param address Wallet address to check
     * @returns Boolean indicating if address is authorized
     */
    isAuthorized(address: string): boolean {
        return this.isValidAddress(address) && 
               this.allowedAddresses.has(address) && 
               !this.blacklistedAddresses.has(address);
    }

    /**
     * Validate a wallet address format
     * @param address Wallet address to validate
     * @returns Boolean indicating address validity
     */
    private isValidAddress(address: string): boolean {
        // Basic validation: non-empty string and correct length
        return address.trim().length > 0 && address.length >= 32;
    }

    /**
     * Check if token generation is within limits
     * @param currentTokenCount Current number of tokens generated
     * @returns Boolean indicating if more tokens can be generated
     */
    canGenerateTokens(currentTokenCount: number): boolean {
        return currentTokenCount < this.tokenGenerationLimit;
    }

    /**
     * Get current allowed addresses
     * @returns Array of allowed addresses
     */
    getAllowedAddresses(): string[] {
        return Array.from(this.allowedAddresses);
    }

    /**
     * Get current blacklisted addresses
     * @returns Array of blacklisted addresses
     */
    getBlacklistedAddresses(): string[] {
        return Array.from(this.blacklistedAddresses);
    }
}