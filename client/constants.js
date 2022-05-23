export const BLOCKCHAIN_BULLETIN_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "adminExistence",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "admins",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "channelExistence",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "channelFactory",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "identifier",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "channels",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "identifier",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "managerExistence",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "postExistence",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getChannels",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "identifier",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "address[]",
              "name": "managers",
              "type": "address[]"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "identifier",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "message",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "creator",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "resourceURL",
                  "type": "string"
                }
              ],
              "internalType": "struct BlockchainBulletin.Post[]",
              "name": "posts",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct BlockchainBulletin.Channel[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "identifier",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "createChannel",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "identifier",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "address[]",
              "name": "managers",
              "type": "address[]"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "identifier",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "message",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "creator",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "resourceURL",
                  "type": "string"
                }
              ],
              "internalType": "struct BlockchainBulletin.Post[]",
              "name": "posts",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct BlockchainBulletin.Channel[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "identifier",
          "type": "bytes32"
        }
      ],
      "name": "deleteChannel",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "identifier",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "address[]",
              "name": "managers",
              "type": "address[]"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "identifier",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "message",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "creator",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "resourceURL",
                  "type": "string"
                }
              ],
              "internalType": "struct BlockchainBulletin.Post[]",
              "name": "posts",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct BlockchainBulletin.Channel[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAdmins",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "addAdmin",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "name": "removeAdmin",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "identifier",
          "type": "bytes32"
        }
      ],
      "name": "getPosts",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "identifier",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "resourceURL",
              "type": "string"
            }
          ],
          "internalType": "struct BlockchainBulletin.Post[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "channelIdentifier",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "postIdentifier",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "resourceURL",
          "type": "string"
        }
      ],
      "name": "createPost",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "identifier",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "resourceURL",
              "type": "string"
            }
          ],
          "internalType": "struct BlockchainBulletin.Post[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "identifer",
          "type": "bytes32"
        }
      ],
      "name": "getManagers",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "identifier",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "newManager",
          "type": "address"
        }
      ],
      "name": "addManager",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "identifier",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "manager",
          "type": "address"
        }
      ],
      "name": "removeManager",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
export const BLOCKCHAIN_BULLETIN_ADDRESS = "0x1d07e32Ea6c8F38226975A2930a66A37b780067c";