export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const tokenpost = getCookie(event, 'tokenpost');
    const body = await readBody(event)
    try {
        const data = await $fetch(`https://api.cod24.ir/api/City/getCities`, {
            method: 'POST',
            body: body , 
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenpost}`
            }
        })
      console.log("QQQQ" , data);
      
        return data;
    } catch (error) {
       console.log("error" , error);
       

        return error
    }
})