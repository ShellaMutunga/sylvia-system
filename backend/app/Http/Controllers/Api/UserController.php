<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\WelcomeEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::with('roles')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:users',
            'phone'   => 'nullable|string|max:20',
            'farm_id' => 'nullable|exists:farms,id',
            'role'    => 'required|string|exists:roles,name',
        ]);

        // Generate a readable temporary password
        $plainPassword = Str::password(10, symbols: false);

        $user = User::create([
            'name'      => $data['name'],
            'email'     => $data['email'],
            'password'  => Hash::make($plainPassword),
            'phone'     => $data['phone'] ?? null,
            'farm_id'   => $data['farm_id'] ?? null,
            'is_active' => true,
        ]);

        $user->assignRole($data['role']);

        // Send welcome email with credentials
        Mail::to($user->email)->send(new WelcomeEmail($user, $plainPassword));

        return response()->json($user->load('roles'), 201);
    }

    public function show(User $user)
    {
        return response()->json($user->load('roles', 'farm'));
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'      => 'sometimes|string|max:255',
            'phone'     => 'nullable|string|max:20',
            'is_active' => 'sometimes|boolean',
            'role'      => 'sometimes|string|exists:roles,name',
        ]);

        $user->update($data);

        if (isset($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return response()->json($user->load('roles'));
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted.']);
    }
}
