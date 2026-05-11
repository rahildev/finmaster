<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('section_settings')->updateOrInsert(
            ['section_key' => 'blog'],
            ['section_name' => 'Blog', 'is_visible' => true, 'sort_order' => 8]
        );
    }

    public function down(): void
    {
        DB::table('section_settings')->where('section_key', 'blog')->delete();
    }
};
