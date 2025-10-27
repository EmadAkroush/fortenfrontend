export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { public: { apiBase } } = useRuntimeConfig()

    try {
        const data = await $fetch(`${apiBase}/auth/register`, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json',
            }
        })
      console.log("data" , data);
  
        setCookie(event, 'token', data, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        })

        return data;
    } catch (error) {
        return error
    }
})