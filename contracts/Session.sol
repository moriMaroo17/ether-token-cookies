// SPDX-License-Identifier: MIT
pragma solidity <0.9.0;

contract Accounts {
    enum Role {
        Bank,
        Shop,
        Provider,
        Seller,
        Customer,
        Admin,
        Guest
    }

    struct Bank {
        string name;
        address bank_address;
    }

    struct Shop {
        string name;
        string city;
        address[] shop_sellers;
        uint16 rate;
        uint256 using_reviews;
    }

    struct Provider {
        string name;
    }

    struct Seller {
        string login;
        string name;
        string city;
        address shop_address;
    }

    struct Customer {
        string login;
        string name;
    }

    struct Admin {
        string login;
        string name;
    }

    address[] public users;

    mapping(address => Role) public role_per_address;
    mapping(string => bytes32) private auth_data;
    mapping(string => address) public address_per_login;

    mapping(address => address) public asks_for_up;
    mapping(address => address) public asks_for_down;

    mapping(address => uint256) public asks_bank;

    Bank main_bank;

    mapping(address => uint256) main_bank_creditors;

    mapping(address => Shop) public shops;
    mapping(address => Provider) public providers;
    mapping(address => Seller) public sellers;
    mapping(address => Customer) public customers;
    mapping(address => Admin) public admins;

    mapping(address => string) private auth_token;

    function get_role(address _user_address)
        public
        view
        returns (string memory)
    {
        Role role = role_per_address[_user_address];
        if (role == Role.Bank) {
            return "bank";
        } else if (role == Role.Shop) {
            return "shop";
        } else if (role == Role.Provider) {
            return "provider";
        } else if (role == Role.Seller) {
            return "seller";
        } else if (role == Role.Customer) {
            return "customer";
        } else if (role == Role.Admin) {
            return "admin";
        }
        return "guest";
    }

    function create_bank_account(
        string memory _bank_name,
        address _bank_address,
        string memory _password
    ) public {
        main_bank = Bank(_bank_name, _bank_address);
        role_per_address[_bank_address] = Role.Bank;
        auth_data[_bank_name] = keccak256(abi.encode(_password));
    }

    function get_bank() public view returns (Bank memory) {
        return main_bank;
    }

    function add_customer(
        string memory _login,
        string memory _name,
        string memory _password
    ) public {
        customers[msg.sender] = Customer(_login, _name);
        auth_data[_login] = keccak256(abi.encode(_password));
        role_per_address[msg.sender] = Role.Customer;
        address_per_login[_login] = msg.sender;
        users.push(msg.sender);
    }

    function add_shop(
        address payable _shop_address,
        string memory _name,
        string memory _city,
        string memory _password
    ) public {
        Shop memory shop;
        shop.name = _name;
        shop.city = _city;
        shop.rate = 0;
        shop.using_reviews = 0;
        shops[_shop_address] = shop;
        role_per_address[_shop_address] = Role.Shop;
        auth_data[_name] = keccak256(abi.encode(_password));

        users.push(_shop_address);
    }

    function check_auth_data(string memory _login, string memory _password)
        public
        view
        returns (bool)
    {
        return (auth_data[_login] == keccak256(abi.encode(_password)));
    }

    function set_token(address _user_address, string memory _token) public {
        auth_token[_user_address] = _token;
    }

    function get_token(address _user_address) public view returns (string memory) {
        return auth_token[_user_address];
    }

    function logout(address _user_address) public {
        auth_token[_user_address] = "";
    }

    function get_address_by_login(string memory _login) public view returns(address) {
        return address_per_login[_login];
    }
}
