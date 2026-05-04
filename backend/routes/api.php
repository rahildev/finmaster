<?php

use App\Http\Controllers\Api\Admin\ContactController;
use App\Http\Controllers\Api\Admin\CourseController;
use App\Http\Controllers\Api\Admin\FaqController;
use App\Http\Controllers\Api\Admin\HeroController;
use App\Http\Controllers\Api\Admin\SectionSettingController;
use App\Http\Controllers\Api\Admin\SettingsController;
use App\Http\Controllers\Api\Admin\TeacherController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\VideoController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LandingPageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Landing Page endpoint
Route::get('/landing', [LandingPageController::class, 'index']);

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Admin routes (auth required)
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {

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

    // Users (Super Admin only)
    Route::apiResource('users', UserController::class);
    Route::get('permissions/available', [UserController::class, 'availablePermissions']);

    // Section Visibility Settings
    Route::get('sections', [SectionSettingController::class, 'index']);
    Route::put('sections/{id}', [SectionSettingController::class, 'update']);
    Route::post('sections/{id}/toggle', [SectionSettingController::class, 'toggleVisibility']);
});
