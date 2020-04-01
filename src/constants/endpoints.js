const root = 'https://api.shwish.app'

export const endpoints = {
  auth: root + '/oauth/token',
  token_info: root + '/oauth/token/info',
  wishes: {
    index: root + '/api/wishes',
  },
}
