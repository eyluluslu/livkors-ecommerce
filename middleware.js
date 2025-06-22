import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Basic token presence check (detailed verification will be done server-side)
    try {
      // Simple base64 decode check to see if token is valid format
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid token format')
      }
    } catch (error) {
      console.error('Token format check failed:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protected routes that require authentication
  if (pathname.startsWith('/cart') || 
      pathname.startsWith('/messages') || 
      pathname.startsWith('/profile')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Basic token presence check
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid token format')
      }
    } catch (error) {
      console.error('Token format check failed:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/cart/:path*', '/messages/:path*', '/profile/:path*']
} 