const contract = require('../bin/contracts/Accounts.json')


module.exports = {

    web3: null,
    contractAddress: null,

    start: async function () {
        const accounts = await this.web3.eth.getAccounts()

        if (accounts) {
            console.log('Attempting to deploy from account', accounts[0]);
        } else {
            console.log('No accounts detected')
        }

        const result = await new this.web3.eth.Contract(contract.abi)
            .deploy({ data: contract.bytecode })
            .send({ gas: 4712388, from: accounts[0] })

        this.contractAddress = result._address
    },

    // register: async function (login, name, password, address, callback) {
    //     const instance = await new this.web3.eth.Contract(contract.abi, this.contractAddress)
    //     await instance.setProvider(this.web3.currentProvider)
    //     await instance.methods.add_customer(login, name, password)
    //         .send({ gas: 4712388, from: address }, (error, result) => {
    //             callback(error, result)
    //         })
    // },

    // getAccounts: async function (callback) {
    //     const accounts = await this.web3.eth.getAccounts()
    //     callback(accounts)
    // },

    // login: async function (login, password, callback) {
    //     const instance = await new this.web3.eth.Contract(contract.abi, this.contractAddress)
    //     await instance.setProvider(this.web3.currentProvider)
    //     await instance.methods.check_auth_data(login, password)
    //         .call((error, result) => {
    //             callback(error, result)
    //         })
    // },

    // getRole: async function (address, callback) {
    //     const instance = await new this.web3.eth.Contract(contract.abi, this.contractAddress)
    //     await instance.setProvider(this.web3.currentProvider)
    //     await instance.methods.get_role(address)
    //         .call((error, result) => {
    //             callback(error, result)
    //         })
    // },

    // setToken: async function (address, token, user, callback) {
    //     const instance = await new this.web3.eth.Contract(contract.abi, this.contractAddress)
    //     await instance.setProvider(this.web3.currentProvider)
    //     await instance.methods.set_token(address, token)
    //         .send({ gas: 4712388, from: user}, (error, result) => {
    //             callback(error, result)
    //         })
    // },

    // getToken: async function (address, callback) {
    //     const instance = await new this.web3.eth.Contract(contract.abi, this.contractAddress)
    //     await instance.setProvider(this.web3.currentProvider)
    //     await instance.methods.get_token(address)
    //         .call((error, result) => {
    //             callback(error, result)
    //         })
    // },

    // logout: async function (address, user, callback) {
    //     const instance = await new this.web3.eth.Contract(contract.abi, this.contractAddress)
    //     await instance.setProvider(this.web3.currentProvider)
    //     await instance.methods.logout(address, token)
    //         .send({ gas: 4712388, from: user}, (error, result) => {
    //             callback(error, result)
    //         })
    // },
}