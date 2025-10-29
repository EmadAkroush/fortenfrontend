export default defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  
  const accessToken = getCookie(event, "accessToken");
   console.log("ggggg");
   

  try {
    const data = await $fetch(`${apiBase}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

      console.log("11111" , data);

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

    return data;
  } catch (error) {
    console.log("error"  , error);
    
    return error;

  }
});
