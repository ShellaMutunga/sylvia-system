<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Redhill Farm ERP</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f2f5; padding: 40px 16px; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.10); }

    /* Header */
    .header { background: linear-gradient(135deg, #024D30 0%, #047857 100%); padding: 40px 36px; text-align: center; }
    .header .logo { font-size: 32px; margin-bottom: 10px; }
    .header h1 { color: #4ade80; font-size: 22px; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; }
    .header p { color: rgba(255,255,255,0.55); font-size: 13px; margin-top: 6px; letter-spacing: 0.04em; }

    /* Body */
    .body { padding: 40px 36px; }
    .greeting { font-size: 22px; color: #111; font-weight: 600; margin-bottom: 12px; }
    .intro { color: #555; font-size: 15px; line-height: 1.7; margin-bottom: 28px; }

    /* Role badge */
    .role-badge { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
    .role-admin     { background: #dcfce7; color: #14532d; }
    .role-manager   { background: #dbeafe; color: #1e3a8a; }
    .role-accountant{ background: #fef9c3; color: #713f12; }
    .role-vet       { background: #fce7f3; color: #831843; }
    .role-worker    { background: #f3f4f6; color: #374151; }

    /* Credentials box */
    .credentials { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 22px 26px; margin: 0 0 28px; }
    .credentials .cred-row { display: flex; align-items: flex-start; gap: 12px; padding: 8px 0; border-bottom: 1px solid #d1fae5; }
    .credentials .cred-row:last-child { border-bottom: none; }
    .credentials .cred-label { font-size: 12px; font-weight: 600; color: #16a34a; text-transform: uppercase; letter-spacing: 0.06em; min-width: 110px; padding-top: 2px; }
    .credentials .cred-value { font-size: 15px; color: #14532d; font-family: 'Courier New', monospace; word-break: break-all; }
    .credentials .cred-value.pw  { font-size: 18px; font-weight: 700; letter-spacing: 0.1em; color: #166534; }

    /* CTA button */
    .btn-wrap { text-align: center; margin: 28px 0; }
    .btn { display: inline-block; background: #16a34a; color: #fff !important; text-decoration: none; padding: 15px 40px; border-radius: 10px; font-size: 15px; font-weight: 600; letter-spacing: 0.05em; }

    /* Warning */
    .warning { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 14px 18px; font-size: 13px; color: #92400e; line-height: 1.6; margin-bottom: 24px; }
    .warning strong { color: #78350f; }

    /* Role description */
    .role-desc { background: #f8fafc; border-left: 4px solid #22c55e; padding: 14px 18px; border-radius: 0 8px 8px 0; font-size: 14px; color: #374151; line-height: 1.6; margin-bottom: 24px; }

    .closing { font-size: 14px; color: #6b7280; line-height: 1.7; }

    /* Footer */
    .footer { background: #f9fafb; padding: 22px 36px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f0f0f0; }
    .footer a { color: #16a34a; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">

    <div class="header">
      <div class="logo">🌿</div>
      <h1>Redhill Farm</h1>
      <p>Farm Management System · Nakuru County, Kenya</p>
    </div>

    <div class="body">
      <p class="greeting">Welcome, {{ $user->name }}!</p>

      @php
        $roleName  = $user->roles->first()?->name ?? 'worker';
        $roleLabel = ucfirst($roleName);
        $roleDescs = [
          'admin'      => 'You have full access to the Redhill Farm ERP — farm configuration, user management, all modules, and financial reporting.',
          'manager'    => 'You have access to all operational modules: crops, animals, inventory, HR, and reporting.',
          'accountant' => 'You have access to the finance and accounting modules, payroll, and transaction reporting.',
          'vet'        => 'You have access to the animals module including health records, vaccinations, and production data.',
          'worker'     => 'You have access to your assigned section of the farm. Your supervisor will guide you on your responsibilities.',
        ];
        $desc = $roleDescs[$roleName] ?? $roleDescs['worker'];
      @endphp

      <p class="intro">
        Your account has been created on the <strong>Redhill Farm ERP</strong> system by the farm administrator.
        Use the credentials below to log in for the first time.
      </p>

      <span class="role-badge role-{{ $roleName }}">{{ $roleLabel }}</span>

      <div class="credentials">
        <div class="cred-row">
          <span class="cred-label">Login URL</span>
          <span class="cred-value">{{ config('app.frontend_url') }}/login</span>
        </div>
        <div class="cred-row">
          <span class="cred-label">Email</span>
          <span class="cred-value">{{ $user->email }}</span>
        </div>
        <div class="cred-row">
          <span class="cred-label">Password</span>
          <span class="cred-value pw">{{ $plainPassword }}</span>
        </div>
        <div class="cred-row">
          <span class="cred-label">Role</span>
          <span class="cred-value">{{ $roleLabel }}</span>
        </div>
      </div>

      <div class="role-desc">
        <strong>What you can do:</strong> {{ $desc }}
      </div>

      <div class="btn-wrap">
        <a href="{{ config('app.frontend_url') }}/login" class="btn">Log In to Redhill Farm ERP</a>
      </div>

      <div class="warning">
        <strong>⚠️ Important:</strong> This is a temporary password. Please change it immediately after your first login by going to your profile settings. Do not share this email with anyone.
      </div>

      <p class="closing">
        If you did not expect this invitation or have any issues, please contact the farm administrator at
        <a href="mailto:{{ config('mail.from.address') }}" style="color:#16a34a;">{{ config('mail.from.address') }}</a>.
      </p>
    </div>

    <div class="footer">
      &copy; {{ date('Y') }} Redhill Farm &middot; Nakuru County, Kenya<br>
      This email was sent from <a href="mailto:{{ config('mail.from.address') }}">{{ config('mail.from.address') }}</a>
    </div>

  </div>
</body>
</html>
