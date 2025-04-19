
import { User, UserRole } from '@/types/auth';

export const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin Test',
    email: 'admin@sonorisation83.fr',
    password: 'admin123',
    role: 'admin' as UserRole,
    phone: '0123456789',
    address: '123 Admin Street'
  },
  {
    id: '2',
    name: 'Client Test',
    email: 'client@example.com',
    password: 'client123',
    role: 'customer' as UserRole,
    phone: '0987654321',
    address: '456 Client Avenue'
  }
];
