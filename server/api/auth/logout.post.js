export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  
  const accessToken = getCookie(event, "accessToken");
   

  try {
    const data = await $fetch(`${apiBase}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setCookie(event, "accessToken", "", {
      httpOnly: true,
      secure: true,
      maxAge: new Date(0),
      path: "/",
    });

    setCookie(event, "refreshToken", "", {
      httpOnly: true,
      secure: true,
      maxAge: new Date(0),
      path: "/",
    });

    setCookie(event, "userId", "", {
      httpOnly: true,
      secure: true,
      maxAge: new Date(0),
      path: "/",
    });

    return data;
  } catch (error) {
    return error;
  }
});
