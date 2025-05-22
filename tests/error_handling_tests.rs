use std::error::Error;
use std::fmt::Display;

mod errors {
    pub(crate) use crate::src::errors::{ContractError, ContractResult};
}

#[test]
fn test_error_creation() {
    // Test initialization error
    let init_error = errors::ContractError::initialization("Database connection failed");
    assert_eq!(
        init_error.to_string(),
        "Initialization failed: Database connection failed"
    );

    // Test token transfer error
    let transfer_error = errors::ContractError::token_transfer("Insufficient balance");
    assert_eq!(
        transfer_error.to_string(),
        "Invalid token transfer: Insufficient balance"
    );

    // Test authorization error
    let auth_error = errors::ContractError::authorization("Permission denied");
    assert_eq!(
        auth_error.to_string(),
        "Authorization failed: Permission denied"
    );
}

#[test]
fn test_error_conversion() {
    // Test validation error
    let validation_error = errors::ContractError::validation("Invalid input format");
    assert_eq!(
        validation_error.to_string(),
        "Invalid input: Invalid input format"
    );

    // Test resource not found error
    let not_found_error = errors::ContractError::resource_not_found("User account");
    assert_eq!(
        not_found_error.to_string(),
        "Resource not found: User account"
    );
}

#[test]
fn test_error_propagation() {
    fn simulate_operation() -> errors::ContractResult<()> {
        Err(errors::ContractError::computation("Math overflow"))
    }

    let result = simulate_operation();
    assert!(result.is_err());
    
    if let Err(err) = result {
        assert_eq!(err.to_string(), "Computation error: Math overflow");
    }
}

#[test]
fn test_unexpected_error() {
    let unexpected = errors::ContractError::unexpected("Unhandled system error");
    assert_eq!(
        unexpected.to_string(),
        "Unexpected error occurred: Unhandled system error"
    );
}