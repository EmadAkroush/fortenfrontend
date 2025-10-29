
export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const refreshToken = getCookie(event, 'refreshToken');
   
    try {
        const data = await $fetch(`${apiBase}/auth/refresh`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        })



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






  

        return data;
    } catch (error) {
     
        
        if(error.statusCode == 401) {
            setCookie(event, 'refreshToken', '', {
                httpOnly: true,
                secure: true,
                maxAge: new Date(0),
                path: '/'
            })
        }

        return error
    }
})