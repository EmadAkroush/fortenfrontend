
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