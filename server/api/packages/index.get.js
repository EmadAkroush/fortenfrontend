export default defineEventHandler(async (event) => {

    
    const { public: { apiBase } } = useRuntimeConfig();
    // const token = getCookie(event, 'token');
  


    try {
        const data = await $fetch(`${apiBase}/packages`, {
            headers: {
                'Accept': 'Multipart/Form-Data',
            },
          
        });
  

        return data;
    } catch (error) {
        return error;
    }
  
  })