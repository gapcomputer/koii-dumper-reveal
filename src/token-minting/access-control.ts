export class AccessControl {
  // Whitelist of allowed minting addresses
  private allowedAddresses: Set<string> = new Set();
  
  // Blacklist of addresses
  private blockedAddresses: Set<string> = new Set();

  /**
   * Add an address to the whitelist
   * @param address Wallet address to whitelist
   */
  addToWhitelist(address: string): void {
    if (!this.isValidAddress(address)) {
      throw new Error('Invalid wallet address');
    }
    this.allowedAddresses.add(address.toLowerCase());
  }

  /**
   * Remove an address from the whitelist
   * @param address Wallet address to remove
   */
  removeFromWhitelist(address: string): void {
    if (!this.isValidAddress(address)) {
      throw new Error('Invalid wallet address');
    }
    this.allowedAddresses.delete(address.toLowerCase());
  }

  /**
   * Block an address from minting
   * @param address Wallet address to block
   */
  blockAddress(address: string): void {
    if (!this.isValidAddress(address)) {
      throw new Error('Invalid wallet address');
    }
    this.blockedAddresses.add(address.toLowerCase());
  }

  /**
   * Check if a wallet can mint tokens
   * @param address Wallet address to check
   * @returns Boolean indicating minting permission
   */
  canMint(address: string): boolean {
    if (!this.isValidAddress(address)) {
      return false;
    }

    const normalizedAddress = address.toLowerCase();
    
    // Check if address is blocked
    if (this.blockedAddresses.has(normalizedAddress)) {
      return false;
    }

    // If whitelist is not empty, only allow whitelisted addresses
    if (this.allowedAddresses.size > 0) {
      return this.allowedAddresses.has(normalizedAddress);
    }

    // If no whitelist, allow all non-blocked addresses
    return true;
  }

  /**
   * Validate wallet address format
   * @param address Wallet address to validate
   * @returns Boolean indicating address validity
   */
  private isValidAddress(address: string): boolean {
    // Basic validation - modify as per specific blockchain requirements
    return typeof address === 'string' && 
           address.length > 0 && 
           /^(0x)?[0-9a-fA-F]{40}$/.test(address);
  }
}