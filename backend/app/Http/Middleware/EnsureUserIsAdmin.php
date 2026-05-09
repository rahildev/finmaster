<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
class EnsureUserIsAdmin {
    public function handle(Request $request, Closure $next) {
        $user = $request->user();
        if (!$user || !in_array($user->role, ['admin', 'super_admin'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return $next($request);
    }
}
