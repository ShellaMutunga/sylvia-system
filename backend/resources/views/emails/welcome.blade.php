<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Redhill Farm ERP</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .header { background: #024D30; padding: 32px; text-align: center; }
    .header h1 { color: #4ade80; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; }
    .header p { color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 13px; letter-spacing: 0.05em; }
    .body { padding: 36px; }
    .body h2 { color: #1a1a1a; font-weight: 400; margin-top: 0; }
    .body p { color: #555; line-height: 1.7; }
    .credentials { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px 24px; margin: 24px 0; }
    .credentials p { margin: 6px 0; color: #166534; font-size: 15px; }
    .credentials strong { color: #14532d; }
    .btn { display: inline-block; background: #22c55e; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; letter-spacing: 0.05em; margin: 8px 0; }
    .warning { background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px 20px; margin: 20px 0; font-size: 13px; color: #92400e; }
    .footer { background: #f9f9f9; padding: 20px 36px; text-align: center; font-size: 12px; color: #aaa; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🌿 Redhill Farm</h1>
      <p>Farm Management System</p>
    </div>
    <div class="body">
      <h2>Welcome, {{ $user->name }}!</h2>
      <p>Your account has been created on the <strong>Redhill Farm ERP</strong> system. You can now log in using the credentials below.</p>

      <div class="credentials">
        <p><strong>Login URL:</strong> {{ config('app.frontend_url') }}/login</p>
        <p><strong>Email:</strong> {{ $user->email }}</p>
        <p><strong>Temporary Password:</strong> {{ $plainPassword }}</p>
        <p><strong>Role:</strong> {{ ucfirst($user->roles->first()?->name ?? 'staff') }}</p>
      </div>

      <a href="{{ config('app.frontend_url') }}/login" class="btn">Login to ERP</a>

      <div class="warning">
        ⚠️ For security, please change your password immediately after your first login.
      </div>

      <p>If you have any issues logging in, contact the farm administrator.</p>
    </div>
    <div class="footer">
      &copy; {{ date('Y') }} Redhill Farm · Nakuru County, Kenya
    </div>
  </div>
</body>
</html>
