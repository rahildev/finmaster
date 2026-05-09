<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;

class ReadTokenFromCookie {
    public function handle(Request $request, Closure $next) {
        // If no Bearer token in Authorization header, check httpOnly cookie.
        // SameSite=Strict on the cookie prevents CSRF without a separate XSRF token.
        if (!$request->bearerToken() && $request->hasCookie('admin_token')) {
            $request->headers->set('Authorization', 'Bearer ' . $request->cookie('admin_token'));
        }
        return $next($request);
    }
}
