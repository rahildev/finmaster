<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('contacts')
            ->where('type', 'linkedin')
            ->update(['value' => 'https://www.linkedin.com/in/togrul-allahverdiyev-602b1a270/']);
    }

    public function down(): void
    {
        //
    }
};
