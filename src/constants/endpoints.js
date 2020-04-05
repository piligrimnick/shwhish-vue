const root = 'https://api.shwish.app'
// const root = 'http://localhost:3000'

export const endpoints = {
  auth: root + '/oauth/token',
  token_info: root + '/oauth/token/info',
  wishes: {
    index: root + '/api/wishes',
    delete: (id) => `${root}/api/wishes/${id}`,
  },
}
