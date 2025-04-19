
import { useAuthentication } from './useAuth/useAuthentication';
import { useRegistration } from './useAuth/useRegistration';
import { useSession } from './useAuth/useSession';

export const useAuthActions = () => {
  const { currentUser, setCurrentUser, loading, setLoading, login, logout } = useAuthentication();
  const { register } = useRegistration();
  const sessionManager = useSession();

  return {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    login,
    register,
    logout
  };
};
