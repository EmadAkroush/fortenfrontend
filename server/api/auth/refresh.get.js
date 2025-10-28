
export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const refreshToken = getCookie(event, 'refreshToken');
     console.log("data in refresh ");
    try {
        const data = await $fetch(`${apiBase}/auth/refresh`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        })
        console.log("data in refresh token api " , data);

        return data;
    } catch (error) {
        console.log("error" , error);
        
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