// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Wall is Ownable {
    constructor(uint256 _minDonate, string memory _name, address _newOwner) {
        minDonate = _minDonate;
        name = _name;
        transferOwnership(_newOwner);
    }

    address master = 0x40223486555fF3f5d1e3863B7d3bd24dFFd3b353;

    uint256 public minDonate;
    string public name;
    struct Messages {
        address sender;
        string message;
        uint64 id;
    }

    Messages[] public messages;

    modifier minValue(uint256 _minDonate) {
        require(_minDonate <= msg.value, "Not enought value");
        _;
    }

    event messageSended(uint64 _id, string _message, address _sender);

    function setMessage(string memory _text)
        public
        payable
        minValue(minDonate)
    {
        messages.push(Messages({
            sender: msg.sender,
            message: _text,
            id: uint64(messages.length)
        }));

        emit messageSended(uint64(messages.length), _text, msg.sender);
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer((address(this).balance * 99) / 100);
        payable(master).transfer(address(this).balance);
    }

    function setMinDonate(uint _newValue) public onlyOwner{
        minDonate = _newValue;
    }

    receive() external payable {}
}

contract WallFactory {
    address[] public walls;
    event wallCreated(address _address, address _owner);

    function createNewWall(uint256 _minDonate, string memory _name) public {
        Wall newWall = new Wall(_minDonate, _name, msg.sender);
        walls.push(address(newWall));

        emit wallCreated(address(newWall), msg.sender);
    }
}
