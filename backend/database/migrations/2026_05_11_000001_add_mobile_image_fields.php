<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->string('image_url_mobile')->nullable()->after('image_url');
        });

        Schema::table('courses', function (Blueprint $table) {
            $table->string('image_url_mobile')->nullable()->after('image_url');
        });

        Schema::table('teacher_info', function (Blueprint $table) {
            $table->string('photo_url_mobile')->nullable()->after('photo_url');
        });
    }

    public function down(): void
    {
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->dropColumn('image_url_mobile');
        });

        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('image_url_mobile');
        });

        Schema::table('teacher_info', function (Blueprint $table) {
            $table->dropColumn('photo_url_mobile');
        });
    }
};
