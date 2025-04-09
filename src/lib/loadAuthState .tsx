export const loadAuthState = () => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      return {
        user: JSON.parse(user),
        token,
        isLoading: false,
        error: null,
      };
    }
  } catch (err) {
    console.error("Error loading auth from localStorage", err);
  }

  return {
    user: null,
    token: null,
    isLoading: false,
    error: null as string | null,
  };
};
