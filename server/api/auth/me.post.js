export default defineEventHandler(async (event) => {
  const { public: { apiBase } } = useRuntimeConfig()
  const config = useRuntimeConfig()
  
  // کوکی‌ها را از مرورگر بخوان
  const refreshToken = getCookie(event, 'refreshToken')
  const userId = getCookie(event, 'userId')

  // بررسی وجود مقادیر لازم
  if (!refreshToken || !userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing authentication cookies',
    })
  }

  try {
    // ارسال درخواست به بک‌اند Forten
    const data = await $fetch(`${apiBase}/auth/refresh`, {
      method: 'POST',
      body: {
        userId,
        refreshToken,
      },
      headers: {
        'Accept': 'application/json',
      },
    })

    // ذخیره Access Token جدید در کوکی
    setCookie(event, 'token', data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1 ساعت
    })

    // Refresh Token جدید هم ذخیره شود (در صورت برگشت از بک‌اند)
    if (data.refreshToken) {
      setCookie(event, 'refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 روز
      })
    }

    // بازگرداندن اطلاعات کاربر
    return { success: true, user: data.user || null }
  } catch (error) {
    // اگر توکن منقضی شده یا نامعتبر بود، کوکی‌ها حذف شوند
    if (error?.statusCode === 401) {
      setCookie(event, 'token', '', { maxAge: 0, path: '/' })
      setCookie(event, 'refreshToken', '', { maxAge: 0, path: '/' })
      setCookie(event, 'userId', '', { maxAge: 0, path: '/' })
    }

    // خطا را بازگردان
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.data?.message || 'Token refresh failed',
    })
  }
})
