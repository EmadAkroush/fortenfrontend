export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { public: { apiBase } } = useRuntimeConfig()
    
    try {
     
        
        const data = await $fetch(`https://api.cod24.ir/api/Account/getToken` , {
            method: 'POST',
            body: {
                userName : 'ztixu0389',
                password : 'I8+Kh0/w3nQXsNfntW5gRAhcVtqOETDWcV/d3o7cBzeHGA5APYcWJtV+UcL5X639lQXjGmo6EDA/6zYvnHnxaCpoCndG86bOO2KooQJZfbaHmBVNx9BqerUJX73Fmxy0E+B+VMhbfzhMiOUoNUeBrg=='
            },
            headers: {
                'Accept': 'application/json',
            }
        })
        // console.log("ffff" , data.token );
        setCookie(event, 'tokenpost', data.token, {
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