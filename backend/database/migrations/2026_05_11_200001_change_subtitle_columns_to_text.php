<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->text('subtitle')->nullable()->change();
            $table->text('subtitle_en')->nullable()->change();
            $table->text('title')->nullable()->change();
            $table->text('title_en')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->string('subtitle')->nullable()->change();
            $table->string('subtitle_en')->nullable()->change();
            $table->string('title')->nullable()->change();
            $table->string('title_en')->nullable()->change();
        });
    }
};
