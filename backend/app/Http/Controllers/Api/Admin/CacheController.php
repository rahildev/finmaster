<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class CacheController extends Controller
{
    public function purge(): JsonResponse
    {
        $zoneId = env('CLOUDFLARE_ZONE_ID');
        $token = env('CLOUDFLARE_API_TOKEN');

        if (!$zoneId || !$token) {
            return response()->json(['message' => 'Cloudflare konfiqurasiya edilməyib'], 500);
        }

        $response = \Illuminate\Support\Facades\Http::withToken($token)
            ->post("https://api.cloudflare.com/client/v4/zones/{$zoneId}/purge_cache", [
                'purge_everything' => true,
            ]);

        if ($response->successful() && $response->json('success')) {
            return response()->json(['message' => 'Keş uğurla təmizləndi']);
        }

        return response()->json(['message' => 'Keş təmizlənərkən xəta baş verdi'], 500);
    }
}
