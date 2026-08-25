export function forgotPasswordTemplate({ name, verificationUrl }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your password</title>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; padding: 24px;">
    
    <h1>Hello ${name}</h1>

    <p>
      We received a request to reset your password.
    </p>

    <a
      href="${verificationUrl}"
      style="
        display: inline-block;
        padding: 12px 20px;
        background: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 6px;
      "
    >
      Reset password
    </a>

    <p style="margin-top: 24px;">
      This link expires in 15 minutes.
      If you didn't request this, you can safely ignore this email.
    </p>

  </div>
</body>
</html>
`;
}
