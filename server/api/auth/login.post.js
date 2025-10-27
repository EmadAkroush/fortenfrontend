export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  try {
    const data = await $fetch(`${apiBase}/auth/login`, {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
      },
    });

    // console.log("add the " , data.accessToken );

   setCookie(event, "userId", data.user._id, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });


    setCookie(event, "accessToken", data.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    setCookie(event, "refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    setCookie(event, "accesstoken", data.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return data;
  } catch (error) {
    return error;
  }
});
