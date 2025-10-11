export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { public: { apiBase } } = useRuntimeConfig();


    try {
        const data = await $fetch(`${apiBase}/api/payment/verifysetareyek`, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json',
            }
        });

        console.log("setareh yek" , data );
        

     
        return data;
    } catch (error) {
        return error;
    }

})