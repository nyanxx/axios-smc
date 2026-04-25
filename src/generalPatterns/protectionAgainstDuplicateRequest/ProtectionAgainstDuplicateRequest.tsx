import { useState } from "react";

function ProtectionAgainstDuplicateRequest() {
  const delay = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleUnprotectedClick = async () => {
    await delay(2000);
    console.log("Hello after 2 seconds");
  };

  const [protectedButtonClicked, setProtectedButtonClicked] = useState(false);

  // This protection is just at the button level, in real cases you might want to wait on the response of the request to enable the button again.
  const handleProtectedClick = async () => {
    if (protectedButtonClicked) return;
    setProtectedButtonClicked(true);
    await delay(2000);
    console.log("Hello after 2 seconds");
    setProtectedButtonClicked(false);
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          className="cursor-pointer shadow-sm py-1 px-4 bg-red-900/20 hover:bg-red-900/30 rounded-lg w-fit text-red-900 font-bold"
          onClick={handleUnprotectedClick}
        >
          Get Data (<em>Unprotected</em>)
        </button>
        <button
          className="cursor-pointer shadow-sm py-1 px-4 bg-emerald-900/20 hover:bg-emerald-900/30 rounded-lg w-fit text-emerald-900 font-bold"
          onClick={handleProtectedClick}
        >
          Get Data (<em>Protected</em>)
        </button>
      </div>
      <p>
        This protection is just at the button level, in real cases you might
        want to wait on the response of the request to enable the button again.
      </p>
    </>
  );
}

export default ProtectionAgainstDuplicateRequest;
