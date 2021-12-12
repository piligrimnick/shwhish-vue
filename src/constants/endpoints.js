// const root = 'https://api.shwish.app'
const root = 'http://localhost:3000'

const endpoints = {
  auth: root + '/oauth/token',
  token_info: root + '/oauth/token/info',
  wishes: {
    index: root + '/api/wishes',
    user_wishes: (userId) => `${root}/api/user_wishes/${userId}`,
    realised_user_wishes: (userId) =>
      `${root}/api/realised_user_wishes/${userId}`,
    delete: (id) => `${root}/api/wishes/${id}`,
    realise: (id) => `${root}/api/wishes/${id}/realise`,
    book: (id) => `${root}/api/wishes/${id}/book`,
    unbook: (id) => `${root}/api/wishes/${id}/unbook`,
  },
  users: {
    index: root + '/api/users',
    show: (id) => `${root}/api/users/${id}`,
  },
}

export { endpoints, root }
