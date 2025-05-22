use thiserror::Error;

/// Comprehensive error enum for smart contract operations
#[derive(Error, Debug, Clone, PartialEq)]
pub enum ContractError {
    /// Generic initialization error
    #[error("Initialization failed: {0}")]
    InitializationError(String),

    /// Token transfer validation error
    #[error("Invalid token transfer: {0}")]
    TokenTransferError(String),

    /// Authorization and permission-related errors
    #[error("Authorization failed: {0}")]
    AuthorizationError(String),

    /// Validation errors for input parameters
    #[error("Invalid input: {0}")]
    ValidationError(String),

    /// Resource not found errors
    #[error("Resource not found: {0}")]
    ResourceNotFoundError(String),

    /// Arithmetic or computational errors
    #[error("Computation error: {0}")]
    ComputationError(String),

    /// Generic unexpected error
    #[error("Unexpected error occurred: {0}")]
    UnexpectedError(String),
}

/// Result type using our custom ContractError
pub type ContractResult<T> = Result<T, ContractError>;

/// Utility functions for error handling
impl ContractError {
    /// Create a new initialization error
    pub fn initialization(message: impl ToString) -> Self {
        ContractError::InitializationError(message.to_string())
    }

    /// Create a new token transfer error
    pub fn token_transfer(message: impl ToString) -> Self {
        ContractError::TokenTransferError(message.to_string())
    }

    /// Create a new authorization error
    pub fn authorization(message: impl ToString) -> Self {
        ContractError::AuthorizationError(message.to_string())
    }

    /// Create a new validation error
    pub fn validation(message: impl ToString) -> Self {
        ContractError::ValidationError(message.to_string())
    }

    /// Create a new resource not found error
    pub fn resource_not_found(message: impl ToString) -> Self {
        ContractError::ResourceNotFoundError(message.to_string())
    }

    /// Create a new computation error
    pub fn computation(message: impl ToString) -> Self {
        ContractError::ComputationError(message.to_string())
    }

    /// Create a new unexpected error
    pub fn unexpected(message: impl ToString) -> Self {
        ContractError::UnexpectedError(message.to_string())
    }
}