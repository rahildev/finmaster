<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('courses', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order'], 'courses_active_sort_index');
        });
        Schema::table('videos', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order'], 'videos_active_sort_index');
        });
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order'], 'hero_sections_active_sort_index');
        });
        Schema::table('faqs', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order'], 'faqs_active_sort_index');
        });
    }

    public function down(): void {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropIndex('courses_active_sort_index');
        });
        Schema::table('videos', function (Blueprint $table) {
            $table->dropIndex('videos_active_sort_index');
        });
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->dropIndex('hero_sections_active_sort_index');
        });
        Schema::table('faqs', function (Blueprint $table) {
            $table->dropIndex('faqs_active_sort_index');
        });
    }
};
