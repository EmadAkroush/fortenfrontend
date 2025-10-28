export default defineEventHandler(async (event) => {
    
    const { public: { apiBase } } = useRuntimeConfig();
    // const token = getCookie(event, 'token');
  
    const queryParams = getQuery(event);

    try {
        const data = await $fetch(`${apiBase}/api/cars`, {
            headers: {
                'Accept': 'Multipart/Form-Data',
            },
            query: queryParams,
        });
  

        return data.data;
    } catch (error) {
        return error;
    }
  
  })