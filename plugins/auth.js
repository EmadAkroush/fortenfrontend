export default defineNuxtPlugin(async (nuxtApp) => {
    const { authUser } = useAuth();

    const headers = useRequestHeaders(['cookie']);

    try {
         const user = await $fetch ('/api/auth/refresh', {
            headers
         })

        
         authUser.value = user;
                 console.log("user" , authUser.value  );
    } catch (error) {
        authUser.value = null;
    }
})