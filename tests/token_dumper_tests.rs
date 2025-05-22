use solana_program::pubkey::Pubkey;
use solana_program::account_info::AccountInfo;

mod token_dumper_tests {
    use super::*;
    use solana_program::program_pack::Pack;
    use std::convert::TryInto;

    #[test]
    fn test_validate_dumping_criteria() {
        use crate::lib::token_dumper::{TokenDumperProgram, TokenDumperState, TokenDumperError};
        
        let state = TokenDumperState {
            total_dumped_tokens: 0,
            dumping_threshold: 100,
            reward_rate: 0.1,
        };
        
        // Test valid dumping criteria
        let valid_result = TokenDumperProgram::validate_dumping_criteria(200, &state);
        assert!(valid_result.is_ok());
        
        // Test invalid dumping criteria (below threshold)
        let invalid_result = TokenDumperProgram::validate_dumping_criteria(50, &state);
        assert!(invalid_result.is_err());
        
        // Verify error type
        match invalid_result {
            Err(TokenDumperError::InsufficientTransferAmount) => {},
            _ => panic!("Unexpected error type"),
        }
    }
    
    #[test]
    fn test_calculate_token_reward() {
        use crate::lib::token_dumper::{TokenDumperProgram, TokenDumperState};
        
        let state = TokenDumperState {
            total_dumped_tokens: 0,
            dumping_threshold: 100,
            reward_rate: 0.1,
        };
        
        let reward = TokenDumperProgram::calculate_token_reward(1000, &state);
        assert_eq!(reward, 100); // 10% of 1000
    }
}

// Mock implementation for AccountInfo and other required types
impl<'a> AccountInfo<'a> {
    fn new(pubkey: Pubkey) -> Self {
        AccountInfo {
            key: &pubkey,
            is_signer: false,
            is_writable: false,
            lamports: std::cell::RefCell::new(0),
            data: std::cell::RefCell::new(vec![]),
            owner: &Pubkey::default(),
            executable: false,
            rent_epoch: 0,
        }
    }
}