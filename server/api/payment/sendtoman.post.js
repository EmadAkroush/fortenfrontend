export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { public: { apiBase } } = useRuntimeConfig();


    try {
        const data = await $fetch(`${apiBase}/api/payment/sendtoman`, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json',
            }
        });

     
        return data;
    } catch (error) {
        return error;
    }

})