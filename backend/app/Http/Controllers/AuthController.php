<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        $user = User::where('email', $credentials['email'])->first();
        if(!$user || !Hash::check($credentials['password'], $user->password)){
            return response()->json(['error' => 'Invalid email or password'], 401);
        }
        $customClaims = ['user' => $user];
        $token = JWTAuth::claims($customClaims)->attempt($credentials);
        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function register(){
        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password'=> bcrypt(request('password'))
        ]);
        $token = auth()->attempt(request(['email', 'password']));
        return response()->json([
            'token' => $token,
            'user' => auth()->user(),
        ]);
    }

    public function logout(){
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh(){
        return response()->json([
            'token' => auth()->refresh(),
            'user' => auth()->user(),
        ]);
    }
}
