<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Hero Sections
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->string('subtitle_en')->nullable()->after('subtitle');
            $table->string('btn_text_en')->nullable()->after('btn_text');
        });

        // Teacher Info
        Schema::table('teacher_info', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->text('bio_en')->nullable()->after('bio');
            $table->text('experience_en')->nullable()->after('experience');
            $table->text('achievements_en')->nullable()->after('achievements');
        });

        // Courses
        Schema::table('courses', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->text('description_en')->nullable()->after('description');
            $table->string('duration_en')->nullable()->after('duration');
        });

        // Videos
        Schema::table('videos', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->text('description_en')->nullable()->after('description');
        });

        // FAQs
        Schema::table('faqs', function (Blueprint $table) {
            $table->text('question_en')->nullable()->after('question');
            $table->text('answer_en')->nullable()->after('answer');
        });

        // Contacts
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('label_en')->nullable()->after('label');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'subtitle_en', 'btn_text_en']);
        });

        Schema::table('teacher_info', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'bio_en', 'experience_en', 'achievements_en']);
        });

        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en', 'duration_en']);
        });

        Schema::table('videos', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'description_en']);
        });

        Schema::table('faqs', function (Blueprint $table) {
            $table->dropColumn(['question_en', 'answer_en']);
        });

        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn(['label_en']);
        });
    }
};
