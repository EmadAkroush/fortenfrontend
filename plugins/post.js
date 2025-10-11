export default defineNuxtPlugin(async (nuxtApp) => {
    // const { authUser } = useAuth();

    // const headers = useRequestHeaders(['cookie']);

    try {
         const user = await $fetch ('/api/postservise/gettoken', {
            method: "POST",
         })

        //  authUser.value = user;
    } catch (error) {
        // authUser.value = null;
        console.log(error);
        
    }
})