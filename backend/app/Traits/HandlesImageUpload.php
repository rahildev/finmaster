<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HandlesImageUpload
{
    /**
     * Şəkli yüklə və path-i qaytarır
     *
     * @param UploadedFile $file
     * @param string $directory
     * @return string
     */
    protected function uploadImage(UploadedFile $file, string $directory = 'uploads'): string
    {
        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs($directory, $filename, 'public');

        return '/storage/' . $path;
    }

    /**
     * Köhnə şəkli sil
     *
     * @param string|null $imageUrl
     * @return void
     */
    protected function deleteImage(?string $imageUrl): void
    {
        if (!$imageUrl) {
            return;
        }

        $path = str_replace('/storage/', '', $imageUrl);
        Storage::disk('public')->delete($path);
    }
}
