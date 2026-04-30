<?php

use App\Http\Controllers\Api\Admin\ContactController;
use App\Http\Controllers\Api\Admin\CourseController;
use App\Http\Controllers\Api\Admin\FaqController;
use App\Http\Controllers\Api\Admin\HeroController;
use App\Http\Controllers\Api\Admin\SettingsController;
use App\Http\Controllers\Api\Admin\TeacherController;
use App\Http\Controllers\Api\Admin\VideoController;
use App\Http\Controllers\Api\LandingPageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Landing Page endpoint
Route::get('/landing', [LandingPageController::class, 'index']);

// Admin routes (hal-hazırda authentication yoxdur, gələcəkdə əlavə ediləcək)
Route::prefix('admin')->group(function () {

    // Site Settings
    Route::apiResource('settings', SettingsController::class);

    // Hero Sections
    Route::apiResource('hero', HeroController::class);

    // Teacher Info
    Route::apiResource('teacher', TeacherController::class);

    // Courses
    Route::apiResource('courses', CourseController::class);

    // Videos
    Route::apiResource('videos', VideoController::class);

    // Contacts
    Route::apiResource('contacts', ContactController::class);

    // FAQs
    Route::apiResource('faqs', FaqController::class);
});
