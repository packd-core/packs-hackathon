import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Address
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addressABI = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const create2ABI = [
  { type: 'error', inputs: [], name: 'Create2EmptyBytecode' },
  { type: 'error', inputs: [], name: 'Create2FailedDeployment' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Create2InsufficientBalance',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create2Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const create2FactoryABI = [
  { type: 'error', inputs: [], name: 'Create2EmptyBytecode' },
  { type: 'error', inputs: [], name: 'Create2FailedDeployment' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Create2InsufficientBalance',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'deployed',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Deployed',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'codeHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'computeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
      { name: 'callbacks', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'deploy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ECDSA
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ecdsaABI = [
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Mock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20MockABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Module
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ModuleABI = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_OPERATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_VALUE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onCreate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'claimer', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onOpen',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onRevoke',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Enumerable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721EnumerableABI = [
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Mock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721MockABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Module
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ModuleABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_OPERATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_VALUE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onCreate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'claimer', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onOpen',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onRevoke',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsABI = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1271
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1271ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsABI = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC6551Account
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc6551AccountABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'context', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSigner',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC6551Executable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc6551ExecutableABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'execute',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC6551Registry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc6551RegistryABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'chainId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'salt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AccountCreated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'account',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'seed', internalType: 'uint256', type: 'uint256' },
      { name: 'initData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createAccount',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Enumerable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721EnumerableABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsABI = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ReceiverABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPackModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPackModuleABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onCreate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'claimer', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onOpen',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onRevoke',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Math
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mathABI = [
  { type: 'error', inputs: [], name: 'MathOverflowedMulDiv' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableABI = [
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PackAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const packAccountABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'execute',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSigner',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PackMain
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const packMainABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'initialOwner_', internalType: 'address', type: 'address' },
      { name: 'baseTokenURI_', internalType: 'string', type: 'string' },
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
      { name: 'registry_', internalType: 'address', type: 'address' },
      { name: 'implementation_', internalType: 'address', type: 'address' },
      { name: 'registryChainId_', internalType: 'uint256', type: 'uint256' },
      { name: 'salt_', internalType: 'uint256', type: 'uint256' },
      {
        name: 'modulesWhitelist_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  { type: 'error', inputs: [], name: 'EtherTransferFailed' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'InvalidClaimerSignature' },
  { type: 'error', inputs: [], name: 'InvalidEthValue' },
  {
    type: 'error',
    inputs: [
      { name: 'modulesLength', internalType: 'uint256', type: 'uint256' },
      { name: 'moduleDataLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidLengthOfData',
  },
  { type: 'error', inputs: [], name: 'InvalidOwnerSignature' },
  { type: 'error', inputs: [], name: 'InvalidRefundValue' },
  {
    type: 'error',
    inputs: [{ name: 'modules', internalType: 'address', type: 'address' }],
    name: 'ModulesNotWhitelisted',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'OnlyOwnerOf',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'TokenNotInExpectedState',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'modules',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'moduleData',
        internalType: 'bytes[]',
        type: 'bytes[]',
        indexed: false,
      },
    ],
    name: 'PackCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'claimer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PackOpened',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PackRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_OPERATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'account',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'claimPublicKey',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'creationBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'modulesWhitelist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'data',
        internalType: 'struct ClaimData',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'sigOwner', internalType: 'bytes', type: 'bytes' },
          { name: 'claimer', internalType: 'address', type: 'address' },
          { name: 'sigClaimer', internalType: 'bytes', type: 'bytes' },
          { name: 'refundValue', internalType: 'uint256', type: 'uint256' },
          { name: 'maxRefundValue', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'moduleData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'open',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to_', internalType: 'address', type: 'address' },
      { name: 'claimPublicKey_', internalType: 'address', type: 'address' },
      { name: 'modules', internalType: 'address[]', type: 'address[]' },
      { name: 'moduleData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'pack',
    outputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'newAccount', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'packModules',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'packState',
    outputs: [
      { name: '', internalType: 'enum PackNFT.PackState', type: 'uint8' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'packStateURIs',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'registry',
    outputs: [
      { name: '', internalType: 'contract IERC6551Registry', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'registryChainId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId_', internalType: 'uint256', type: 'uint256' },
      { name: 'moduleData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'revoke',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'salt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'modules', internalType: 'address[]', type: 'address[]' },
      { name: 'value', internalType: 'bool', type: 'bool' },
    ],
    name: 'setModulesWhitelist',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PackNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const packNftABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'baseTokenURI_', internalType: 'string', type: 'string' },
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
  },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'creationBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'packState',
    outputs: [
      { name: '', internalType: 'enum PackNFT.PackState', type: 'uint8' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'packStateURIs',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PackRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const packRegistryABI = [
  { type: 'error', inputs: [], name: 'AccountCreationFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'chainId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'salt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AccountCreated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'account',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'uint256', type: 'uint256' },
      { name: 'initData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createAccount',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeErc20ABI = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'currentAllowance', internalType: 'uint256', type: 'uint256' },
      { name: 'requestedDecrease', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeERC20FailedDecreaseAllowance',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SignatureValidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const signatureValidatorABI = [
  { type: 'error', inputs: [], name: 'InvalidClaimerSignature' },
  { type: 'error', inputs: [], name: 'InvalidOwnerSignature' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringsABI = [
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'StringsInsufficientHexLength',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link create2FactoryABI}__.
 */
export function useCreate2FactoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof create2FactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof create2FactoryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: create2FactoryABI,
    ...config,
  } as UseContractReadConfig<
    typeof create2FactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link create2FactoryABI}__ and `functionName` set to `"computeAddress"`.
 */
export function useCreate2FactoryComputeAddress<
  TFunctionName extends 'computeAddress',
  TSelectData = ReadContractResult<typeof create2FactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof create2FactoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: create2FactoryABI,
    functionName: 'computeAddress',
    ...config,
  } as UseContractReadConfig<
    typeof create2FactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link create2FactoryABI}__.
 */
export function useCreate2FactoryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof create2FactoryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof create2FactoryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof create2FactoryABI, TFunctionName, TMode>({
    abi: create2FactoryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link create2FactoryABI}__ and `functionName` set to `"deploy"`.
 */
export function useCreate2FactoryDeploy<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof create2FactoryABI,
          'deploy'
        >['request']['abi'],
        'deploy',
        TMode
      > & { functionName?: 'deploy' }
    : UseContractWriteConfig<typeof create2FactoryABI, 'deploy', TMode> & {
        abi?: never
        functionName?: 'deploy'
      } = {} as any,
) {
  return useContractWrite<typeof create2FactoryABI, 'deploy', TMode>({
    abi: create2FactoryABI,
    functionName: 'deploy',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link create2FactoryABI}__.
 */
export function usePrepareCreate2FactoryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof create2FactoryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: create2FactoryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof create2FactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link create2FactoryABI}__ and `functionName` set to `"deploy"`.
 */
export function usePrepareCreate2FactoryDeploy(
  config: Omit<
    UsePrepareContractWriteConfig<typeof create2FactoryABI, 'deploy'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: create2FactoryABI,
    functionName: 'deploy',
    ...config,
  } as UsePrepareContractWriteConfig<typeof create2FactoryABI, 'deploy'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link create2FactoryABI}__.
 */
export function useCreate2FactoryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof create2FactoryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: create2FactoryABI,
    ...config,
  } as UseContractEventConfig<typeof create2FactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link create2FactoryABI}__ and `eventName` set to `"Deployed"`.
 */
export function useCreate2FactoryDeployedEvent(
  config: Omit<
    UseContractEventConfig<typeof create2FactoryABI, 'Deployed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: create2FactoryABI,
    eventName: 'Deployed',
    ...config,
  } as UseContractEventConfig<typeof create2FactoryABI, 'Deployed'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc165ABI}__.
 */
export function useErc165Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc165ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc165ABI, ...config } as UseContractReadConfig<
    typeof erc165ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc165ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc165SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc165ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc165ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc165ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc20ABI, ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
    abi: erc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__.
 */
export function useErc20MockRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20MockAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20MockBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20MockDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"name"`.
 */
export function useErc20MockName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20MockSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20MockTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__.
 */
export function useErc20MockWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20MockABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, TFunctionName, TMode>({
    abi: erc20MockABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20MockApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20MockABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'approve', TMode>({
    abi: erc20MockABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"mint"`.
 */
export function useErc20MockMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof erc20MockABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'mint', TMode>({
    abi: erc20MockABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20MockTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20MockABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'transfer', TMode>({
    abi: erc20MockABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20MockTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20MockABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'transferFrom', TMode>({
    abi: erc20MockABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__.
 */
export function usePrepareErc20MockWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20MockApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareErc20MockMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20MockTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20MockTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20MockABI}__.
 */
export function useErc20MockEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20MockABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20MockABI,
    ...config,
  } as UseContractEventConfig<typeof erc20MockABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20MockABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20MockApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20MockABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20MockABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20MockABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20MockABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20MockTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20MockABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20MockABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20MockABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ModuleABI}__.
 */
export function useErc20ModuleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ModuleABI,
    ...config,
  } as UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"CALL_OPERATION"`.
 */
export function useErc20ModuleCallOperation<
  TFunctionName extends 'CALL_OPERATION',
  TSelectData = ReadContractResult<typeof erc20ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ModuleABI,
    functionName: 'CALL_OPERATION',
    ...config,
  } as UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"CALL_VALUE"`.
 */
export function useErc20ModuleCallValue<
  TFunctionName extends 'CALL_VALUE',
  TSelectData = ReadContractResult<typeof erc20ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ModuleABI,
    functionName: 'CALL_VALUE',
    ...config,
  } as UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__.
 */
export function useErc20ModuleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ModuleABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ModuleABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ModuleABI, TFunctionName, TMode>({
    abi: erc20ModuleABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function useErc20ModuleOnCreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ModuleABI,
          'onCreate'
        >['request']['abi'],
        'onCreate',
        TMode
      > & { functionName?: 'onCreate' }
    : UseContractWriteConfig<typeof erc20ModuleABI, 'onCreate', TMode> & {
        abi?: never
        functionName?: 'onCreate'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ModuleABI, 'onCreate', TMode>({
    abi: erc20ModuleABI,
    functionName: 'onCreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function useErc20ModuleOnOpen<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ModuleABI,
          'onOpen'
        >['request']['abi'],
        'onOpen',
        TMode
      > & { functionName?: 'onOpen' }
    : UseContractWriteConfig<typeof erc20ModuleABI, 'onOpen', TMode> & {
        abi?: never
        functionName?: 'onOpen'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ModuleABI, 'onOpen', TMode>({
    abi: erc20ModuleABI,
    functionName: 'onOpen',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function useErc20ModuleOnRevoke<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ModuleABI,
          'onRevoke'
        >['request']['abi'],
        'onRevoke',
        TMode
      > & { functionName?: 'onRevoke' }
    : UseContractWriteConfig<typeof erc20ModuleABI, 'onRevoke', TMode> & {
        abi?: never
        functionName?: 'onRevoke'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ModuleABI, 'onRevoke', TMode>({
    abi: erc20ModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__.
 */
export function usePrepareErc20ModuleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ModuleABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ModuleABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ModuleABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function usePrepareErc20ModuleOnCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onCreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ModuleABI,
    functionName: 'onCreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onCreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function usePrepareErc20ModuleOnOpen(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onOpen'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ModuleABI,
    functionName: 'onOpen',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onOpen'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function usePrepareErc20ModuleOnRevoke(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onRevoke'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onRevoke'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc721ABI, ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"name"`.
 */
export function useErc721Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc721SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721TokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, TFunctionName, TMode>({
    abi: erc721ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'approve', TMode>({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'safeTransferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof erc721ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'setApprovalForAll', TMode>({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'transferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function usePrepareErc721Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__.
 */
export function useErc721EnumerableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721EnumerableBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721EnumerableGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721EnumerableIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"name"`.
 */
export function useErc721EnumerableName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721EnumerableOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc721EnumerableSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721EnumerableSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useErc721EnumerableTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function useErc721EnumerableTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721EnumerableTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc721EnumerableTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__.
 */
export function useErc721EnumerableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof erc721EnumerableABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721EnumerableABI, TFunctionName, TMode>({
    abi: erc721EnumerableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721EnumerableApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721EnumerableABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721EnumerableABI, 'approve', TMode>({
    abi: erc721EnumerableABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721EnumerableSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof erc721EnumerableABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc721EnumerableABI,
    'safeTransferFrom',
    TMode
  >({
    abi: erc721EnumerableABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721EnumerableSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof erc721EnumerableABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc721EnumerableABI,
    'setApprovalForAll',
    TMode
  >({
    abi: erc721EnumerableABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721EnumerableTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof erc721EnumerableABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721EnumerableABI, 'transferFrom', TMode>({
    abi: erc721EnumerableABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__.
 */
export function usePrepareErc721EnumerableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721EnumerableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721EnumerableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721EnumerableApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721EnumerableABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721EnumerableABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721EnumerableSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc721EnumerableABI,
      'safeTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721EnumerableABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721EnumerableSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc721EnumerableABI,
      'setApprovalForAll'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721EnumerableABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721EnumerableTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721EnumerableABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721EnumerableABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721EnumerableABI}__.
 */
export function useErc721EnumerableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721EnumerableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721EnumerableABI,
    ...config,
  } as UseContractEventConfig<typeof erc721EnumerableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721EnumerableABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721EnumerableApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721EnumerableABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721EnumerableABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721EnumerableABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721EnumerableABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721EnumerableApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721EnumerableABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721EnumerableABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721EnumerableABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721EnumerableABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721EnumerableTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721EnumerableABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721EnumerableABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721EnumerableABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__.
 */
export function useErc721MockRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721MockBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721MockGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721MockIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"name"`.
 */
export function useErc721MockName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721MockOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc721MockSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721MockSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721MockTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__.
 */
export function useErc721MockWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721MockABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, TFunctionName, TMode>({
    abi: erc721MockABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721MockApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721MockABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'approve', TMode>({
    abi: erc721MockABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"mint"`.
 */
export function useErc721MockMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof erc721MockABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'mint', TMode>({
    abi: erc721MockABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721MockSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof erc721MockABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'safeTransferFrom', TMode>({
    abi: erc721MockABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721MockSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof erc721MockABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'setApprovalForAll', TMode>({
    abi: erc721MockABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721MockTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc721MockABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'transferFrom', TMode>({
    abi: erc721MockABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__.
 */
export function usePrepareErc721MockWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721MockApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareErc721MockMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721MockSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721MockSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721MockTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721MockABI}__.
 */
export function useErc721MockEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721MockABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721MockABI,
    ...config,
  } as UseContractEventConfig<typeof erc721MockABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721MockABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721MockApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721MockABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721MockABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721MockABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721MockABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721MockApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721MockABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721MockABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721MockABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721MockABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721MockTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721MockABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721MockABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721MockABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ModuleABI}__.
 */
export function useErc721ModuleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ModuleABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ModuleABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc721ModuleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"CALL_OPERATION"`.
 */
export function useErc721ModuleCallOperation<
  TFunctionName extends 'CALL_OPERATION',
  TSelectData = ReadContractResult<typeof erc721ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ModuleABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ModuleABI,
    functionName: 'CALL_OPERATION',
    ...config,
  } as UseContractReadConfig<
    typeof erc721ModuleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"CALL_VALUE"`.
 */
export function useErc721ModuleCallValue<
  TFunctionName extends 'CALL_VALUE',
  TSelectData = ReadContractResult<typeof erc721ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ModuleABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ModuleABI,
    functionName: 'CALL_VALUE',
    ...config,
  } as UseContractReadConfig<
    typeof erc721ModuleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__.
 */
export function useErc721ModuleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ModuleABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721ModuleABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721ModuleABI, TFunctionName, TMode>({
    abi: erc721ModuleABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function useErc721ModuleOnCreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ModuleABI,
          'onCreate'
        >['request']['abi'],
        'onCreate',
        TMode
      > & { functionName?: 'onCreate' }
    : UseContractWriteConfig<typeof erc721ModuleABI, 'onCreate', TMode> & {
        abi?: never
        functionName?: 'onCreate'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ModuleABI, 'onCreate', TMode>({
    abi: erc721ModuleABI,
    functionName: 'onCreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function useErc721ModuleOnOpen<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ModuleABI,
          'onOpen'
        >['request']['abi'],
        'onOpen',
        TMode
      > & { functionName?: 'onOpen' }
    : UseContractWriteConfig<typeof erc721ModuleABI, 'onOpen', TMode> & {
        abi?: never
        functionName?: 'onOpen'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ModuleABI, 'onOpen', TMode>({
    abi: erc721ModuleABI,
    functionName: 'onOpen',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function useErc721ModuleOnRevoke<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ModuleABI,
          'onRevoke'
        >['request']['abi'],
        'onRevoke',
        TMode
      > & { functionName?: 'onRevoke' }
    : UseContractWriteConfig<typeof erc721ModuleABI, 'onRevoke', TMode> & {
        abi?: never
        functionName?: 'onRevoke'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ModuleABI, 'onRevoke', TMode>({
    abi: erc721ModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__.
 */
export function usePrepareErc721ModuleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ModuleABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ModuleABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ModuleABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function usePrepareErc721ModuleOnCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onCreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ModuleABI,
    functionName: 'onCreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onCreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function usePrepareErc721ModuleOnOpen(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onOpen'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ModuleABI,
    functionName: 'onOpen',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onOpen'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function usePrepareErc721ModuleOnRevoke(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onRevoke'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onRevoke'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1271ABI}__.
 */
export function useIerc1271Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc1271ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc1271ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1271ABI,
    ...config,
  } as UseContractReadConfig<typeof ierc1271ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1271ABI}__ and `functionName` set to `"isValidSignature"`.
 */
export function useIerc1271IsValidSignature<
  TFunctionName extends 'isValidSignature',
  TSelectData = ReadContractResult<typeof ierc1271ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc1271ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1271ABI,
    functionName: 'isValidSignature',
    ...config,
  } as UseContractReadConfig<typeof ierc1271ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc165ABI}__.
 */
export function useIerc165Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc165ABI,
    ...config,
  } as UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc165ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc165SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc165ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, TFunctionName, TMode>({
    abi: ierc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'approve', TMode>({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof ierc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'transfer', TMode>({
    abi: ierc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof ierc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'transferFrom', TMode>({
    abi: ierc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function usePrepareIerc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20ABI,
    ...config,
  } as UseContractEventConfig<typeof ierc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc20ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20MetadataAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20MetadataBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"decimals"`.
 */
export function useIerc20MetadataDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"name"`.
 */
export function useIerc20MetadataName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"symbol"`.
 */
export function useIerc20MetadataSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc20MetadataTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20MetadataABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, TFunctionName, TMode>({
    abi: ierc20MetadataABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20MetadataApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20MetadataABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'approve', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20MetadataTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof ierc20MetadataABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'transfer', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20MetadataTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof ierc20MetadataABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'transferFrom', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function usePrepareIerc20MetadataWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20MetadataApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20MetadataTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20MetadataTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc20MetadataABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MetadataABI,
    ...config,
  } as UseContractEventConfig<typeof ierc20MetadataABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20MetadataApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20MetadataABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MetadataABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc20MetadataABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20MetadataTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20MetadataABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MetadataABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc20MetadataABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function useIerc20PermitRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20PermitABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useIerc20PermitDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20PermitABI,
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"nonces"`.
 */
export function useIerc20PermitNonces<
  TFunctionName extends 'nonces',
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20PermitABI,
    functionName: 'nonces',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function useIerc20PermitWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20PermitABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20PermitABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20PermitABI, TFunctionName, TMode>({
    abi: ierc20PermitABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"permit"`.
 */
export function useIerc20PermitPermit<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20PermitABI,
          'permit'
        >['request']['abi'],
        'permit',
        TMode
      > & { functionName?: 'permit' }
    : UseContractWriteConfig<typeof ierc20PermitABI, 'permit', TMode> & {
        abi?: never
        functionName?: 'permit'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20PermitABI, 'permit', TMode>({
    abi: ierc20PermitABI,
    functionName: 'permit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function usePrepareIerc20PermitWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20PermitABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20PermitABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20PermitABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareIerc20PermitPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20PermitABI, 'permit'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20PermitABI,
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20PermitABI, 'permit'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551AccountABI}__.
 */
export function useIerc6551AccountRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551AccountABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551AccountABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551AccountABI}__ and `functionName` set to `"isValidSigner"`.
 */
export function useIerc6551AccountIsValidSigner<
  TFunctionName extends 'isValidSigner',
  TSelectData = ReadContractResult<typeof ierc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551AccountABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551AccountABI,
    functionName: 'isValidSigner',
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551AccountABI}__ and `functionName` set to `"state"`.
 */
export function useIerc6551AccountState<
  TFunctionName extends 'state',
  TSelectData = ReadContractResult<typeof ierc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551AccountABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551AccountABI,
    functionName: 'state',
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551AccountABI}__ and `functionName` set to `"token"`.
 */
export function useIerc6551AccountToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof ierc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551AccountABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551AccountABI,
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551ExecutableABI}__.
 */
export function useIerc6551ExecutableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551ExecutableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc6551ExecutableABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551ExecutableABI, TFunctionName, TMode>({
    abi: ierc6551ExecutableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551ExecutableABI}__ and `functionName` set to `"execute"`.
 */
export function useIerc6551ExecutableExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551ExecutableABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<typeof ierc6551ExecutableABI, 'execute', TMode> & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551ExecutableABI, 'execute', TMode>({
    abi: ierc6551ExecutableABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551ExecutableABI}__.
 */
export function usePrepareIerc6551ExecutableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551ExecutableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551ExecutableABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc6551ExecutableABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551ExecutableABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareIerc6551ExecutableExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551ExecutableABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551ExecutableABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc6551ExecutableABI, 'execute'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function useIerc6551RegistryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc6551RegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551RegistryABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551RegistryABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551RegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `functionName` set to `"account"`.
 */
export function useIerc6551RegistryAccount<
  TFunctionName extends 'account',
  TSelectData = ReadContractResult<typeof ierc6551RegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551RegistryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551RegistryABI,
    functionName: 'account',
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551RegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function useIerc6551RegistryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551RegistryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc6551RegistryABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551RegistryABI, TFunctionName, TMode>({
    abi: ierc6551RegistryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function useIerc6551RegistryCreateAccount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551RegistryABI,
          'createAccount'
        >['request']['abi'],
        'createAccount',
        TMode
      > & { functionName?: 'createAccount' }
    : UseContractWriteConfig<
        typeof ierc6551RegistryABI,
        'createAccount',
        TMode
      > & {
        abi?: never
        functionName?: 'createAccount'
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551RegistryABI, 'createAccount', TMode>({
    abi: ierc6551RegistryABI,
    functionName: 'createAccount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function usePrepareIerc6551RegistryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551RegistryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551RegistryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc6551RegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function usePrepareIerc6551RegistryCreateAccount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551RegistryABI, 'createAccount'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551RegistryABI,
    functionName: 'createAccount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc6551RegistryABI,
    'createAccount'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function useIerc6551RegistryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc6551RegistryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc6551RegistryABI,
    ...config,
  } as UseContractEventConfig<typeof ierc6551RegistryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `eventName` set to `"AccountCreated"`.
 */
export function useIerc6551RegistryAccountCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc6551RegistryABI, 'AccountCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc6551RegistryABI,
    eventName: 'AccountCreated',
    ...config,
  } as UseContractEventConfig<typeof ierc6551RegistryABI, 'AccountCreated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function useIerc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useIerc721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useIerc721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc721SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function useIerc721Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc721ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, TFunctionName, TMode>({
    abi: ierc721ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, 'approve', TMode>({
    abi: ierc721ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc721SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof ierc721ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, 'safeTransferFrom', TMode>({
    abi: ierc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc721SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof ierc721ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, 'setApprovalForAll', TMode>({
    abi: ierc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc721TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof ierc721ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, 'transferFrom', TMode>({
    abi: ierc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function usePrepareIerc721Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc721TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function useIerc721Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc721ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721ABI,
    ...config,
  } as UseContractEventConfig<typeof ierc721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc721ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof ierc721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc721TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function useIerc721EnumerableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc721EnumerableBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"getApproved"`.
 */
export function useIerc721EnumerableGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc721EnumerableIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useIerc721EnumerableOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc721EnumerableSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useIerc721EnumerableTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function useIerc721EnumerableTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc721EnumerableTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function useIerc721EnumerableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc721EnumerableABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, TFunctionName, TMode>({
    abi: ierc721EnumerableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc721EnumerableApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc721EnumerableABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, 'approve', TMode>({
    abi: ierc721EnumerableABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc721EnumerableSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof ierc721EnumerableABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc721EnumerableABI,
    'safeTransferFrom',
    TMode
  >({
    abi: ierc721EnumerableABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc721EnumerableSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof ierc721EnumerableABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc721EnumerableABI,
    'setApprovalForAll',
    TMode
  >({
    abi: ierc721EnumerableABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc721EnumerableTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof ierc721EnumerableABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, 'transferFrom', TMode>({
    abi: ierc721EnumerableABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function usePrepareIerc721EnumerableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721EnumerableABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc721EnumerableApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc721EnumerableSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721EnumerableABI,
      'safeTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721EnumerableABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc721EnumerableSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721EnumerableABI,
      'setApprovalForAll'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721EnumerableABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc721EnumerableTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721EnumerableABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function useIerc721EnumerableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc721EnumerableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721EnumerableABI,
    ...config,
  } as UseContractEventConfig<typeof ierc721EnumerableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc721EnumerableApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721EnumerableABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721EnumerableABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc721EnumerableABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc721EnumerableApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721EnumerableABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721EnumerableABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof ierc721EnumerableABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc721EnumerableTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721EnumerableABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721EnumerableABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc721EnumerableABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function useIerc721MetadataRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc721MetadataBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"getApproved"`.
 */
export function useIerc721MetadataGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc721MetadataIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"name"`.
 */
export function useIerc721MetadataName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useIerc721MetadataOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc721MetadataSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"symbol"`.
 */
export function useIerc721MetadataSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useIerc721MetadataTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function useIerc721MetadataWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc721MetadataABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, TFunctionName, TMode>({
    abi: ierc721MetadataABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc721MetadataApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc721MetadataABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, 'approve', TMode>({
    abi: ierc721MetadataABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc721MetadataSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof ierc721MetadataABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, 'safeTransferFrom', TMode>(
    {
      abi: ierc721MetadataABI,
      functionName: 'safeTransferFrom',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc721MetadataSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof ierc721MetadataABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc721MetadataABI,
    'setApprovalForAll',
    TMode
  >({
    abi: ierc721MetadataABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc721MetadataTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof ierc721MetadataABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, 'transferFrom', TMode>({
    abi: ierc721MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function usePrepareIerc721MetadataWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721MetadataABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc721MetadataApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721MetadataABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc721MetadataSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721MetadataABI,
      'safeTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721MetadataABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc721MetadataSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721MetadataABI,
      'setApprovalForAll'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721MetadataABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc721MetadataTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721MetadataABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function useIerc721MetadataEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc721MetadataABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721MetadataABI,
    ...config,
  } as UseContractEventConfig<typeof ierc721MetadataABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc721MetadataApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721MetadataABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721MetadataABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc721MetadataABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc721MetadataApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721MetadataABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721MetadataABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof ierc721MetadataABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc721MetadataTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721MetadataABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721MetadataABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc721MetadataABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ReceiverABI}__.
 */
export function useIerc721ReceiverWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ReceiverABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc721ReceiverABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ReceiverABI, TFunctionName, TMode>({
    abi: ierc721ReceiverABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ReceiverABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useIerc721ReceiverOnErc721Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ReceiverABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & { functionName?: 'onERC721Received' }
    : UseContractWriteConfig<
        typeof ierc721ReceiverABI,
        'onERC721Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ReceiverABI, 'onERC721Received', TMode>(
    {
      abi: ierc721ReceiverABI,
      functionName: 'onERC721Received',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ReceiverABI}__.
 */
export function usePrepareIerc721ReceiverWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ReceiverABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ReceiverABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ReceiverABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ReceiverABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePrepareIerc721ReceiverOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721ReceiverABI,
      'onERC721Received'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ReceiverABI,
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721ReceiverABI,
    'onERC721Received'
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPackModuleABI}__.
 */
export function useIPackModuleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPackModuleABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iPackModuleABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iPackModuleABI, TFunctionName, TMode>({
    abi: iPackModuleABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function useIPackModuleOnCreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPackModuleABI,
          'onCreate'
        >['request']['abi'],
        'onCreate',
        TMode
      > & { functionName?: 'onCreate' }
    : UseContractWriteConfig<typeof iPackModuleABI, 'onCreate', TMode> & {
        abi?: never
        functionName?: 'onCreate'
      } = {} as any,
) {
  return useContractWrite<typeof iPackModuleABI, 'onCreate', TMode>({
    abi: iPackModuleABI,
    functionName: 'onCreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function useIPackModuleOnOpen<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPackModuleABI,
          'onOpen'
        >['request']['abi'],
        'onOpen',
        TMode
      > & { functionName?: 'onOpen' }
    : UseContractWriteConfig<typeof iPackModuleABI, 'onOpen', TMode> & {
        abi?: never
        functionName?: 'onOpen'
      } = {} as any,
) {
  return useContractWrite<typeof iPackModuleABI, 'onOpen', TMode>({
    abi: iPackModuleABI,
    functionName: 'onOpen',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function useIPackModuleOnRevoke<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPackModuleABI,
          'onRevoke'
        >['request']['abi'],
        'onRevoke',
        TMode
      > & { functionName?: 'onRevoke' }
    : UseContractWriteConfig<typeof iPackModuleABI, 'onRevoke', TMode> & {
        abi?: never
        functionName?: 'onRevoke'
      } = {} as any,
) {
  return useContractWrite<typeof iPackModuleABI, 'onRevoke', TMode>({
    abi: iPackModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPackModuleABI}__.
 */
export function usePrepareIPackModuleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPackModuleABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPackModuleABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPackModuleABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function usePrepareIPackModuleOnCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onCreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPackModuleABI,
    functionName: 'onCreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onCreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function usePrepareIPackModuleOnOpen(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onOpen'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPackModuleABI,
    functionName: 'onOpen',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onOpen'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function usePrepareIPackModuleOnRevoke(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onRevoke'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPackModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onRevoke'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ownableABI,
    ...config,
  } as UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"owner"`.
 */
export function useOwnableOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ownableABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownableABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ownableABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, TFunctionName, TMode>({
    abi: ownableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useOwnableRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownableABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof ownableABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, 'renounceOwnership', TMode>({
    abi: ownableABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useOwnableTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownableABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof ownableABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, 'transferOwnership', TMode>({
    abi: ownableABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function usePrepareOwnableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareOwnableRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareOwnableTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ownableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownableABI,
    ...config,
  } as UseContractEventConfig<typeof ownableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useOwnableOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof ownableABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownableABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof ownableABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__.
 */
export function usePackAccountRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"isValidSignature"`.
 */
export function usePackAccountIsValidSignature<
  TFunctionName extends 'isValidSignature',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'isValidSignature',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"isValidSigner"`.
 */
export function usePackAccountIsValidSigner<
  TFunctionName extends 'isValidSigner',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'isValidSigner',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"owner"`.
 */
export function usePackAccountOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"state"`.
 */
export function usePackAccountState<
  TFunctionName extends 'state',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'state',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function usePackAccountSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"token"`.
 */
export function usePackAccountToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__.
 */
export function usePackAccountWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof packAccountABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, TFunctionName, TMode>({
    abi: packAccountABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"execute"`.
 */
export function usePackAccountExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<typeof packAccountABI, 'execute', TMode> & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'execute', TMode>({
    abi: packAccountABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__.
 */
export function usePreparePackAccountWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"execute"`.
 */
export function usePreparePackAccountExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'execute'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__.
 */
export function usePackMainRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"CALL_OPERATION"`.
 */
export function usePackMainCallOperation<
  TFunctionName extends 'CALL_OPERATION',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'CALL_OPERATION',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"VERSION"`.
 */
export function usePackMainVersion<
  TFunctionName extends 'VERSION',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'VERSION',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"account"`.
 */
export function usePackMainAccount<
  TFunctionName extends 'account',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'account',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"balanceOf"`.
 */
export function usePackMainBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"claimPublicKey"`.
 */
export function usePackMainClaimPublicKey<
  TFunctionName extends 'claimPublicKey',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'claimPublicKey',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"creationBlock"`.
 */
export function usePackMainCreationBlock<
  TFunctionName extends 'creationBlock',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'creationBlock',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"getApproved"`.
 */
export function usePackMainGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"implementation"`.
 */
export function usePackMainImplementation<
  TFunctionName extends 'implementation',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'implementation',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function usePackMainIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"modulesWhitelist"`.
 */
export function usePackMainModulesWhitelist<
  TFunctionName extends 'modulesWhitelist',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'modulesWhitelist',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"name"`.
 */
export function usePackMainName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"owner"`.
 */
export function usePackMainOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"ownerOf"`.
 */
export function usePackMainOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"packModules"`.
 */
export function usePackMainPackModules<
  TFunctionName extends 'packModules',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'packModules',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"packState"`.
 */
export function usePackMainPackState<
  TFunctionName extends 'packState',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'packState',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"packStateURIs"`.
 */
export function usePackMainPackStateUrIs<
  TFunctionName extends 'packStateURIs',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'packStateURIs',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"registry"`.
 */
export function usePackMainRegistry<
  TFunctionName extends 'registry',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'registry',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"registryChainId"`.
 */
export function usePackMainRegistryChainId<
  TFunctionName extends 'registryChainId',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'registryChainId',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"salt"`.
 */
export function usePackMainSalt<
  TFunctionName extends 'salt',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'salt',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function usePackMainSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"symbol"`.
 */
export function usePackMainSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function usePackMainTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function usePackMainTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"tokenURI"`.
 */
export function usePackMainTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"totalSupply"`.
 */
export function usePackMainTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__.
 */
export function usePackMainWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof packMainABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, TFunctionName, TMode>({
    abi: packMainABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"approve"`.
 */
export function usePackMainApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof packMainABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'approve', TMode>({
    abi: packMainABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"open"`.
 */
export function usePackMainOpen<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'open'
        >['request']['abi'],
        'open',
        TMode
      > & { functionName?: 'open' }
    : UseContractWriteConfig<typeof packMainABI, 'open', TMode> & {
        abi?: never
        functionName?: 'open'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'open', TMode>({
    abi: packMainABI,
    functionName: 'open',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"pack"`.
 */
export function usePackMainPack<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'pack'
        >['request']['abi'],
        'pack',
        TMode
      > & { functionName?: 'pack' }
    : UseContractWriteConfig<typeof packMainABI, 'pack', TMode> & {
        abi?: never
        functionName?: 'pack'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'pack', TMode>({
    abi: packMainABI,
    functionName: 'pack',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePackMainRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof packMainABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'renounceOwnership', TMode>({
    abi: packMainABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"revoke"`.
 */
export function usePackMainRevoke<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'revoke'
        >['request']['abi'],
        'revoke',
        TMode
      > & { functionName?: 'revoke' }
    : UseContractWriteConfig<typeof packMainABI, 'revoke', TMode> & {
        abi?: never
        functionName?: 'revoke'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'revoke', TMode>({
    abi: packMainABI,
    functionName: 'revoke',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePackMainSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof packMainABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'safeTransferFrom', TMode>({
    abi: packMainABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePackMainSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof packMainABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'setApprovalForAll', TMode>({
    abi: packMainABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"setModulesWhitelist"`.
 */
export function usePackMainSetModulesWhitelist<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'setModulesWhitelist'
        >['request']['abi'],
        'setModulesWhitelist',
        TMode
      > & { functionName?: 'setModulesWhitelist' }
    : UseContractWriteConfig<
        typeof packMainABI,
        'setModulesWhitelist',
        TMode
      > & {
        abi?: never
        functionName?: 'setModulesWhitelist'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'setModulesWhitelist', TMode>({
    abi: packMainABI,
    functionName: 'setModulesWhitelist',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePackMainTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof packMainABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'transferFrom', TMode>({
    abi: packMainABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePackMainTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof packMainABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'transferOwnership', TMode>({
    abi: packMainABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__.
 */
export function usePreparePackMainWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"approve"`.
 */
export function usePreparePackMainApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"open"`.
 */
export function usePreparePackMainOpen(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'open'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'open',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'open'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"pack"`.
 */
export function usePreparePackMainPack(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'pack'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'pack',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'pack'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePreparePackMainRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"revoke"`.
 */
export function usePreparePackMainRevoke(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'revoke'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'revoke',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'revoke'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePreparePackMainSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePreparePackMainSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"setModulesWhitelist"`.
 */
export function usePreparePackMainSetModulesWhitelist(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'setModulesWhitelist'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'setModulesWhitelist',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'setModulesWhitelist'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePreparePackMainTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePreparePackMainTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__.
 */
export function usePackMainEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    ...config,
  } as UseContractEventConfig<typeof packMainABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"Approval"`.
 */
export function usePackMainApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function usePackMainApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function usePackMainOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"PackCreated"`.
 */
export function usePackMainPackCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'PackCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'PackCreated',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'PackCreated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"PackOpened"`.
 */
export function usePackMainPackOpenedEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'PackOpened'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'PackOpened',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'PackOpened'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"PackRevoked"`.
 */
export function usePackMainPackRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'PackRevoked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'PackRevoked',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'PackRevoked'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"Transfer"`.
 */
export function usePackMainTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__.
 */
export function usePackNftRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"balanceOf"`.
 */
export function usePackNftBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"creationBlock"`.
 */
export function usePackNftCreationBlock<
  TFunctionName extends 'creationBlock',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'creationBlock',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"getApproved"`.
 */
export function usePackNftGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function usePackNftIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"name"`.
 */
export function usePackNftName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"ownerOf"`.
 */
export function usePackNftOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"packState"`.
 */
export function usePackNftPackState<
  TFunctionName extends 'packState',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'packState',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"packStateURIs"`.
 */
export function usePackNftPackStateUrIs<
  TFunctionName extends 'packStateURIs',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'packStateURIs',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function usePackNftSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"symbol"`.
 */
export function usePackNftSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function usePackNftTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function usePackNftTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"tokenURI"`.
 */
export function usePackNftTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"totalSupply"`.
 */
export function usePackNftTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__.
 */
export function usePackNftWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof packNftABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof packNftABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, TFunctionName, TMode>({
    abi: packNftABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"approve"`.
 */
export function usePackNftApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packNftABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof packNftABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, 'approve', TMode>({
    abi: packNftABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePackNftSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packNftABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof packNftABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, 'safeTransferFrom', TMode>({
    abi: packNftABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePackNftSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packNftABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof packNftABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, 'setApprovalForAll', TMode>({
    abi: packNftABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePackNftTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packNftABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof packNftABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, 'transferFrom', TMode>({
    abi: packNftABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__.
 */
export function usePreparePackNftWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"approve"`.
 */
export function usePreparePackNftApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePreparePackNftSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePreparePackNftSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePreparePackNftTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packNftABI}__.
 */
export function usePackNftEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof packNftABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: packNftABI,
    ...config,
  } as UseContractEventConfig<typeof packNftABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packNftABI}__ and `eventName` set to `"Approval"`.
 */
export function usePackNftApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof packNftABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packNftABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof packNftABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packNftABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function usePackNftApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof packNftABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packNftABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof packNftABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packNftABI}__ and `eventName` set to `"Transfer"`.
 */
export function usePackNftTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof packNftABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packNftABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof packNftABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packRegistryABI}__.
 */
export function usePackRegistryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof packRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packRegistryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: packRegistryABI,
    ...config,
  } as UseContractReadConfig<
    typeof packRegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packRegistryABI}__ and `functionName` set to `"account"`.
 */
export function usePackRegistryAccount<
  TFunctionName extends 'account',
  TSelectData = ReadContractResult<typeof packRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packRegistryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packRegistryABI,
    functionName: 'account',
    ...config,
  } as UseContractReadConfig<
    typeof packRegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packRegistryABI}__.
 */
export function usePackRegistryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packRegistryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof packRegistryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof packRegistryABI, TFunctionName, TMode>({
    abi: packRegistryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packRegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function usePackRegistryCreateAccount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packRegistryABI,
          'createAccount'
        >['request']['abi'],
        'createAccount',
        TMode
      > & { functionName?: 'createAccount' }
    : UseContractWriteConfig<typeof packRegistryABI, 'createAccount', TMode> & {
        abi?: never
        functionName?: 'createAccount'
      } = {} as any,
) {
  return useContractWrite<typeof packRegistryABI, 'createAccount', TMode>({
    abi: packRegistryABI,
    functionName: 'createAccount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packRegistryABI}__.
 */
export function usePreparePackRegistryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packRegistryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packRegistryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof packRegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packRegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function usePreparePackRegistryCreateAccount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packRegistryABI, 'createAccount'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packRegistryABI,
    functionName: 'createAccount',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packRegistryABI, 'createAccount'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packRegistryABI}__.
 */
export function usePackRegistryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof packRegistryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: packRegistryABI,
    ...config,
  } as UseContractEventConfig<typeof packRegistryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packRegistryABI}__ and `eventName` set to `"AccountCreated"`.
 */
export function usePackRegistryAccountCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof packRegistryABI, 'AccountCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packRegistryABI,
    eventName: 'AccountCreated',
    ...config,
  } as UseContractEventConfig<typeof packRegistryABI, 'AccountCreated'>)
}
