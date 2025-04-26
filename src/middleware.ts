import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Check if the request is for the root path
    if (request.nextUrl.pathname === '/') {
        // Redirect to the refund page
        return NextResponse.redirect(new URL('/refund', request.url))
    }
     
    // Continue with the request if not redirected
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}