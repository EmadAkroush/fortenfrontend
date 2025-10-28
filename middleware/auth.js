export default defineNuxtRouteMiddleware(() => {
    const { authUser } = useAuth();
console.log("dfdsfsfsffff 4574545"  , authUser.value);

    if (!authUser.value) {
        return navigateTo('/auth');
    }
})