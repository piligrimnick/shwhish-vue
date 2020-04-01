const _ = require('lodash')

module.exports = {
  all: [
    {
      id: 1,
      email: 'admin',
      password: 'password',
      name: 'Vue Master',
    },
    {
      id: 2,
      email: 'user1',
      password: 'password',
      name: 'User One',
    },
  ].map((user) => {
    return {
      ...user,
      token: `valid-token-for-${user.email}`,
    }
  }),
  authenticate({ email, password }) {
    return new Promise((resolve, reject) => {
      const matchedUser = this.all.find(
        (user) => user.email === email && user.password === password
      )
      if (matchedUser) {
        resolve(this.json(matchedUser))
      } else {
        reject(new Error('Invalid user credentials.'))
      }
    })
  },
  findBy(propertyName, value) {
    const matchedUser = this.all.find((user) => user[propertyName] === value)
    return this.json(matchedUser)
  },
  json(user) {
    return user && _.omit(user, ['password'])
  },
}
