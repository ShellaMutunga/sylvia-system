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
        // Create roles
        $roles = ['admin', 'manager', 'accountant', 'vet', 'worker'];
        foreach ($roles as $role) {
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
                'contact_info'   => '+254 700 000000',
            ]
        );

        // Admin user (farm owner)
        $admin = User::firstOrCreate(
            ['email' => 'sylvia@redhill.com'],
            [
                'name'      => 'Sylvia Karebe',
                'password'  => bcrypt('password'),
                'phone'     => '+254 700 000001',
                'farm_id'   => $farm->id,
                'is_active' => true,
            ]
        );
        $admin->syncRoles(['admin']);

        // Manager
        $manager = User::firstOrCreate(
            ['email' => 'manager@redhill.com'],
            [
                'name'      => 'John Kamau',
                'password'  => bcrypt('password'),
                'phone'     => '+254 700 000002',
                'farm_id'   => $farm->id,
                'is_active' => true,
            ]
        );
        $manager->syncRoles(['manager']);

        // Accountant
        $accountant = User::firstOrCreate(
            ['email' => 'accounts@redhill.com'],
            [
                'name'      => 'Grace Mwangi',
                'password'  => bcrypt('password'),
                'phone'     => '+254 700 000003',
                'farm_id'   => $farm->id,
                'is_active' => true,
            ]
        );
        $accountant->syncRoles(['accountant']);

        // Vet
        $vet = User::firstOrCreate(
            ['email' => 'vet@redhill.com'],
            [
                'name'      => 'Dr. Peter Otieno',
                'password'  => bcrypt('password'),
                'phone'     => '+254 700 000004',
                'farm_id'   => $farm->id,
                'is_active' => true,
            ]
        );
        $vet->syncRoles(['vet']);

        // Sheep Profile
        $sheep = User::firstOrCreate(
            ['email' => 'sheep@redhill.com'],
            [
                'name'      => 'Sheep Manager',
                'password'  => bcrypt('password'),
                'phone'     => '+254 700 000005',
                'farm_id'   => $farm->id,
                'is_active' => true,
            ]
        );
        $sheep->syncRoles(['worker']);

        // Fish Profile
        $fish = User::firstOrCreate(
            ['email' => 'fish@redhill.com'],
            [
                'name'      => 'Fish Manager',
                'password'  => bcrypt('password'),
                'phone'     => '+254 700 000006',
                'farm_id'   => $farm->id,
                'is_active' => true,
            ]
        );
        $fish->syncRoles(['worker']);

        // Vegetable Profile
        $vegetable = User::firstOrCreate(
            ['email' => 'vegetable@redhill.com'],
            [
                'name'      => 'Vegetable Manager',
                'password'  => bcrypt('password'),
                'phone'     => '+254 700 000007',
                'farm_id'   => $farm->id,
                'is_active' => true,
            ]
        );
        $vegetable->syncRoles(['worker']);

        // Demo Profile
        $demo = User::firstOrCreate(
            ['email' => 'demonstration@redhill.com'],
            [
                'name'      => 'Demo Manager',
                'password'  => bcrypt('password'),
                'phone'     => '+254 700 000008',
                'farm_id'   => $farm->id,
                'is_active' => true,
            ]
        );
        $demo->syncRoles(['worker']);
    }
}
