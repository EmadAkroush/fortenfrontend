export default defineEventHandler(async (event) => {
    
    const { public: { apiBase } } = useRuntimeConfig();
    // const token = getCookie(event, 'token');
    const query = getQuery(event);

    
    try {
        const data = await $fetch(`${apiBase}/api/categories/${query.categoryid}/products`, {
            headers: {
                'Accept': 'Multipart/Form-Data',
            },
        });
       console.log("spt" , query);
       

        return data.data;
    } catch (error) {
        return error;
    }
  
  })