<?php

namespace Database\Seeders;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create all roles
        foreach (['admin', 'manager', 'accountant', 'vet', 'sheep', 'fish'] as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // Create the main farm
        $farm = Farm::firstOrCreate(
            ['name' => 'Redhill Farm'],
            [
                'location'       => 'Nakuru County, Kenya',
                'total_area'     => 500.00,
                'established_at' => '2010-01-01',
                'description'    => 'Large scale mixed farm (crops & livestock)',
                'contact_info'   => 'mariakattie874@gmail.com',
            ]
        );

        // Admin — the only seeded user; all others are created via the dashboard
        $admin = User::firstOrCreate(
            ['email' => 'mariakattie874@gmail.com'],
            [
                'name'      => 'Maria Katie',
                'password'  => bcrypt('Admin@2024!'),
                'phone'     => null,
                'farm_id'   => $farm->id,
                'is_active' => true,
            ]
        );
        $admin->syncRoles(['admin']);
    }
}
