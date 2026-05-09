<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super Admin user yaradırıq
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@finmaster.az',
            'password' => Hash::make(env('SUPER_ADMIN_PASSWORD', Str::random(32))),
            'role' => 'super_admin',
        ]);

        $this->command->info('✅ Super Admin yaradıldı:');
        $this->command->info('   Email: admin@finmaster.az');
        $this->command->info('   Şifrə: SUPER_ADMIN_PASSWORD .env dəyişənindən götürüldü');
    }
}
