export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { public: { apiBase } } = useRuntimeConfig()
    // const token = getCookie(event, 'token');
     console.log("dddddd" , body);
     const queryParams = getQuery(event);
  
    try {
        const data = await $fetch(`${apiBase}/api/filteradvanced`, {
            method: 'POST',
            body: body,
            query: queryParams,
            headers: {
                'Accept': 'Multipart/Form-Data',
            }
        })
        
        return data.data;
    } catch (error) {
        console.log("go" , error);
        
        return error
    }
})