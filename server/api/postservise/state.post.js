export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const tokenpost = getCookie(event, 'tokenpost');

    try {
        const data = await $fetch(`https://api.cod24.ir/api/State/getStates`, {
            method: 'POST',
            
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenpost}`
            }
        })
 
      
        return data;
    } catch (error) {
     

        return error
    }
})