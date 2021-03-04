import { User } from '../../users/user.entity';

export const mockedUser: User = {
  id: 'c5e8a613-3fd9-4f1b-9012-a6b3a9f50128',
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  address: {
    id: 'f4221a48-e89a-4de4-bdee-d13aa0641da5',
    street: 'streetName',
    city: 'cityName',
    country: 'countryName',
  },
};
