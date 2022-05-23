// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract BlockchainBulletin { 
    struct Existence {
        bool exists;
        uint index;
    }
    
    struct Post {
        bytes32 identifier;
        uint256 timestamp;
        string message;
        address creator;
        string resourceURL;
    }

    struct Channel {
        bytes32 identifier;
        uint256 timestamp;
        string description;
        address[] managers;
        Post[] posts;
    }

    address[] public admins;
    Channel[] public channels;

    mapping(address => Existence) public adminExistence;
    mapping(bytes32 => Existence) public channelExistence;
    mapping(bytes32 => mapping(bytes32 => Existence)) public postExistence;
    mapping(bytes32 => mapping(address => Existence)) public managerExistence;

    mapping(bytes32 => Channel) public channelFactory;

    constructor() {
        admins.push(msg.sender);
        Existence storage existence = adminExistence[msg.sender];
        existence.exists = true;
        existence.index = 0;
    }

    modifier adminOnly {
        require(
            adminExistence[msg.sender].exists,
            "This operation is only accessible to admins."
        );

        _;
    }

    modifier managerOnly(bytes32 channelIdentifier) {
        if (adminExistence[msg.sender].exists) {
            _;
            return;
        }

        require(
            managerExistence[channelIdentifier][msg.sender].exists,
            "This operation is only accessible to admins or the channel's managers."
        );

        _;
    }

    modifier channelExists(bytes32 identifier) {
        require(channelExistence[identifier].exists, "A channel with the provided identifier does not exist.");
        _;
    }

    modifier channelExistsWithoutPost(bytes32 channelIdentifier, bytes32 postIdentifier) {
        require(channelExistence[channelIdentifier].exists, "A channel with the provided identifier does not exist.");
        require(!postExistence[channelIdentifier][postIdentifier].exists, "A post with the provided identifier already exits.");
        _;
    }

    function getChannels() public view returns (Channel[] memory) {
        return channels;
    }

    function createChannel(bytes32 identifier, string calldata description) public adminOnly returns (Channel[] memory) {        
        Existence storage existence = channelExistence[identifier];

        require(!existence.exists, "A channel with the provided identifier already exists.");
        
        channels.push(channelFactory[identifier]);
        Channel storage channel = channels[channels.length - 1];
        channel.identifier = identifier;
        channel.timestamp = block.timestamp;
        channel.description = description;
        channel.managers.push(msg.sender);
        
        existence.exists = true;
        existence.index = channels.length - 1;

        return channels;
    }

    function deleteChannel(bytes32 identifier) public adminOnly returns (Channel[] memory) {
        Existence storage existence = channelExistence[identifier];
        
        require(existence.exists, "A channel with the provided identifier does not exist.");

        bytes32 existingIdentifier = channels[channels.length - 1].identifier;
        channels[existence.index] = channels[channels.length - 1];
        channels.pop();

        channelExistence[existingIdentifier].index = existence.index;
        delete channelExistence[identifier];

        return channels;
    }

    function getAdmins() public view returns (address[] memory) {
        return admins;
    }

    function addAdmin(address newAdmin) public adminOnly returns (address[] memory) {
        Existence storage existence = adminExistence[newAdmin];

        require (!existence.exists, "An admin with the provided address already exists.");
        
        admins.push(newAdmin);
        existence.exists = true;
        existence.index = admins.length - 1;
        return admins;
    }

    function removeAdmin(address admin) public adminOnly returns (address[] memory) {
        Existence storage existence = adminExistence[admin];

        require (existence.exists, "An admin with the provided address does not exist.");
        require (msg.sender != admin, "Modifying admin status of self is not allowed.");

        address existingAdmin = admins[admins.length - 1];
        admins[existence.index] = admins[admins.length - 1];
        admins.pop();

        adminExistence[existingAdmin].index = existence.index;
        delete adminExistence[admin];

        return admins;
    }

    function getPosts(bytes32 identifier) public view returns (Post[] memory) {
        return channels[channelExistence[identifier].index].posts;
    }

    function createPost(bytes32 channelIdentifier, bytes32 postIdentifier, string calldata message, string calldata resourceURL) public channelExistsWithoutPost(channelIdentifier, postIdentifier) managerOnly(channelIdentifier) returns (Post[] memory) {
        Post[] storage posts = channels[channelExistence[channelIdentifier].index].posts;

        posts.push(Post({
            identifier: postIdentifier,
            timestamp: block.timestamp,
            message: message,
            creator: msg.sender,
            resourceURL: resourceURL
        }));

        mapping(bytes32 => Existence) storage channelPostExistence = postExistence[channelIdentifier];
        Existence storage existence = channelPostExistence[postIdentifier];
        existence.exists = true;
        existence.index = posts.length - 1;

        return posts;
    }

    function getManagers(bytes32 identifer) public view returns (address[] memory) {
        return channels[channelExistence[identifer].index].managers;
    }

    function addManager(bytes32 identifier, address newManager) public channelExists(identifier) managerOnly(identifier) returns (address[] memory) {
        Existence storage existence = managerExistence[identifier][newManager];

        require(!existence.exists, "A manager for the provided channel already exists.");

        address[] storage managers = channels[channelExistence[identifier].index].managers;
        managers.push(newManager);
        existence.exists = true;
        existence.index = managers.length - 1;

        return managers; 
    }

    function removeManager(bytes32 identifier, address manager) public channelExists(identifier) managerOnly(identifier) returns (address[] memory) {
        Existence storage existence = managerExistence[identifier][manager];

        require (existence.exists, "A manager with the provided address does not exist.");

        address[] storage managers = channels[channelExistence[identifier].index].managers;
        address existingManager = managers[managers.length - 1];
        managers[existence.index] = managers[managers.length - 1];
        managers.pop();

        managerExistence[identifier][existingManager].index = existence.index;
        delete managerExistence[identifier][manager];

        return managers;
    }
}
