<?php

namespace App\Http\Controllers\Api;

use stdClass;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        Log::info('User Registration Start', ['email' => $request->email]);

        $validatedData = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'name' => 'required|max:255',
        ]);

        DB::beginTransaction();
        try {

            $data = User::create($validatedData);

            DB::commit();

            // $token = JWTAuth::attempt($request->only('email', 'password'));

            // $userResponse = new stdClass();
            // $userResponse->token = $token;
            // $userResponse->token_expires_in = JWTAuth::factory()->getTTL() * 60;
            // $userResponse->token_type = 'bearer';
            Log::info('User Registration Success', ['user_id' => $data->id, 'email' => $data->email]);

            return response()->json(['message' => 'Sign up successfully', 'data' => null], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('User Registration Failure: Validation failed', ['email' => $request->email, 'errors' => $e->errors()]);

            DB::rollBack();

            return response()->json(['message' => $e->errors()], 422);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('User Registration Error', ['email' => $request->email, 'error' => $e->getMessage()]);

            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        Log::info('User Login Start', ['email' => $request->email]);

        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $user = User::where('email', $validatedData['email'])->first();

        if (!$user) {
            Log::warning('User Login Failure: User not found', ['email' => $validatedData['email']]);


            return response()->json(['message' => 'Username not found', 'data' => null], 404);
        }

        if (!$token = JWTAuth::attempt(['email' => $user->email, 'password' => $validatedData['password']])) {
            Log::warning('User Login Failure: Invalid credentials', ['email' => $validatedData['email']]);

            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $userResponse = new stdClass();
        $userResponse->token = $token;
        $userResponse->token_expires_in = JWTAuth::factory()->getTTL() * 60;
        $userResponse->token_type = 'bearer';

        Log::info('User Login Success', ['email' => $user->email]);

        return response()->json(['message' => 'Sign in successfully', 'data' => $userResponse], 201);
    }

public function logout()
{
    Log::info('User Logout Start');

    try {
        JWTAuth::invalidate(JWTAuth::getToken());

        Log::info('User Logout Success');

        return response()->json([
            'message' => 'Logout successfully.',
            'data' => null
        ], 200);

    } catch (\Throwable $e) {
        Log::error('User Logout Error', ['error' => $e->getMessage()]);

        return response()->json([
            'message' => 'Logout failed'
        ], 500);
    }
}


    public function refresh(Request $request)
    {
        Log::info('Token Refresh Start');

        try {
            $token = $request->bearerToken();
            $newToken = JWTAuth::refresh($token);

            Log::info('Token Refresh Success');

            return response()->json(['message' => 'Token refreshed successfully', 'data' => ['token' => $newToken]], 200);
        } catch (\Throwable $th) {
            Log::error('Token Refresh Error', ['error' => $th->getMessage()]);

            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
}
