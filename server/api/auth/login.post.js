export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  try {
    const data = await $fetch(`${apiBase}/auth/login`, {
      method: "POST",
      credentials: 'include', // 🔥 بدون این، کوکی‌ها منتقل نمی‌شن
      body: body,
      headers: {
        Accept: "application/json",
      },
    });




    setCookie(event, "accessToken", data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // 🔥 حتما اضافه کن برای Cross-Site
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    setCookie(event, "refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // 🔥 حتما اضافه کن برای Cross-Site
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

 

    return data;
  } catch (error) {
    return error;
  }
});
