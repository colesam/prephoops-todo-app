<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Request as RequestFacade;
use Route;
use DB;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $oauthPasswordClient = DB::connection()->table('oauth_clients')
            ->select([
                'id',
                'secret'
            ])
            ->where('name', 'Laravel Password Grant Client')
            ->first();

        if (is_null($oauthPasswordClient))
        {
            return response()->json('Something is wrong with the server configuration.', 500);
        }

        try
        {
            // Add parameters to request to abstract oauth details from client
            $new_request = RequestFacade::create('/oauth/token', 'POST', [
                'grant_type' => 'password',
                'client_id' => $oauthPasswordClient->id,
                'client_secret' => $oauthPasswordClient->secret,
                'username' => $request->username,
                'password' => $request->password,
            ]);
            RequestFacade::replace($new_request->input());

            /** @noinspection PhpParamsInspection */
            return Route::dispatch($new_request);
        }
        catch(\Exception $e)
        {
            return response()->json('Something went wrong with the server.', 500);
        }
    }

    public function logout()
    {
        foreach (auth()->user()->tokens as $token)
        {
            $token->delete();
        }

        return response()->json('Logged out successfully.',200);
    }
}
