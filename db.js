'use strict'

var _ = require('lodash')
var faker = require('faker')

var Sequelize = require('sequelize')
var sequelize = new Sequelize('dbtests', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'dbtests.sqlite'
})

var Account = sequelize.define('account', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.STRING
  }
})

Account.sync().then(function () {
  var accountsData = _.times(10, function () {
    return {
      id: faker.random.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      zip: faker.address.zipCode()
    }
  })

  accountsData.map(function (row) {
    Account.create(row).then(function (account) {
      console.dir(account.get())
    })
  })
})
