export function verificationTemplate({ name, verificationUrl }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email</title>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; padding: 24px;">
    
    <h1>Hello ${name}</h1>

    <p>
      Thanks for signing up.
      Please verify your email address by clicking the button below.
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
      Verify Email
    </a>

    <p style="margin-top: 24px;">
      If you didn't create an account, you can safely ignore this email.
    </p>

  </div>
</body>
</html>
`;
}
