<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'id' => 1,
            'name' => 'User',
            'email' => 'user@user.com',
            'hasRole' => 'user',
            'password' => bcrypt('useruser'),
            'email_verified_at' => now(),
        ]);

        User::factory()->create([
            'id' => 2,
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'hasRole' => 'admin',
            'password' => bcrypt('adminadmin'),
            'email_verified_at' => now(),
        ]);


        // Create Tasks for User
        User::find(1)->projects()->createMany(
            Project::factory()->count(30)->raw(['assigned_user_id' => 1])
        );

        // Create Tasks for Administrator
        User::find(2)->projects()->createMany(
            Project::factory()->count(30)->raw(['assigned_user_id' => 2])
        );
    }
}
