import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { faker } from '@faker-js/faker'

export default defineFakeRoute([
  {
    url: '/api/get-user-info',
    response: () => {
      return {
        id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        sex: faker.person.sexType(),
        role: 'admin',
      }
    },
  },
])
