import React from 'react';

const GoogleOAuthButton = () => {
  // Fetch CSRF token from the meta tag
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

  return (
    <form method="post" action="/users/auth/google_oauth2" className="w-full">
      {/* Hidden input to include CSRF token */}
      <input type="hidden" name="authenticity_token" value={csrfToken} />
      <button
        type="submit"
        className="flex h-[2.75rem] w-full items-center justify-center gap-[0.6875rem] rounded-[12px] border border-gray-300 bg-white px-[3.5rem] py-[0.625rem] text-black sm:w-[25.625rem]"
      >
        {/* Placeholder for Google icon with text */}
        <span className="h-6 w-6 flex items-center justify-center text-lg font-bold">G</span>
        <span className="font-medium">Sign in with Google</span>
      </button>
    </form>
  );
};

export default GoogleOAuthButton;
