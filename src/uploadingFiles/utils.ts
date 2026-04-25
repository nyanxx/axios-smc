export function createFile(
  fileContent: string = "I am just a dummy file",
  fileName: string = "dummy_file.txt",
  fileType: string = "text/plain",
): File {
  const blob = new Blob([fileContent], {
    type: fileType,
  });
  const file = new File([blob], fileName, {
    type: fileType,
  });
  return file;
}

/**
 * Creates a downloadable link from a {@link Blob} or {@link File}.
 *
 * This utility generates an object URL and returns an anchor (`<a>`) element
 * configured for downloading the provided data. It optionally supports
 * auto-triggering the download and automatic cleanup of resources.
 *
 * @param d - The data to download. Must be a {@link Blob} or {@link File}.
 *
 * @param opt - Optional configuration.
 * @param opt.autoClick - If `true`, automatically triggers the download via `link.click()`. Default: `false`.
 * @param opt.bodyAppend - If `true`, appends the link to `document.body`. Required in some browsers for auto-click to work. Default: `false`.
 * @param opt.cleanup - If `true` and `autoClick` is enabled, automatically removes the link and revokes the object URL after execution. Default: `true`.
 * @param opt.linkText - Text content for the anchor element. Default: `"Download"`.
 * @param opt.log - If `true`, logs the generated object URL to the console. Default: `false`.
 * @param opt.filename - Custom filename for the download. Falls back to `File.name` or `"download"`.
 *
 * @returns An object containing:
 * - `link`: The generated HTMLAnchorElement
 * - `cleanup`: A function to manually remove the link and revoke the object URL
 *
 * @throws {Error} If input is not a Blob/File or if executed outside a browser environment.
 *
 * @example
 * // Auto download
 * const { link } = createDownloadLink(blob, { autoClick: true });
 *
 * @example
 * // Manual usage
 * const { link, cleanup } = createDownloadLink(blob);
 * document.body.appendChild(link);
 *
 * // later...
 * cleanup();
 *
 * @example
 * // With custom filename
 * createDownloadLink(blob, {
 *   autoClick: true,
 *   filename: "report.pdf"
 * });
 */
export function createDownloadLink(
  d: File | Blob,
  opt: {
    autoClick?: boolean;
    bodyAppend?: boolean;
    cleanup?: boolean;
    linkText?: string;
    log?: boolean;
    filename?: string;
  } = {},
) {
  if (!(d instanceof Blob)) {
    throw new Error("Unsupported Input: must be File or Blob");
  }

  if (typeof window === "undefined") {
    throw new Error("Download can only run in browser");
  }

  const {
    autoClick = false,
    bodyAppend = false,
    cleanup = true,
    linkText = "Download",
    log = false,
    filename,
  } = opt;

  const objectURL = window.URL.createObjectURL(d);

  const link = document.createElement("a");
  link.href = objectURL;

  const finalName = filename || (d instanceof File ? d.name : "download");

  link.download = finalName;
  link.textContent = linkText;

  if (log) console.log("Download URL:", objectURL);

  if (bodyAppend) {
    document.body.appendChild(link);
  }

  if (autoClick) {
    link.click();
  }

  const cleanupFn = () => {
    link.remove();
    window.URL.revokeObjectURL(objectURL);
  };

  if (cleanup && autoClick) {
    setTimeout(cleanupFn, 0);
  }

  return { link, cleanup: cleanupFn };
}

export function roundDecimalPart(num: number, by: number = 2): number {
  const factor = Math.pow(10, by);
  return Math.round(num * factor) / factor;
  // return num.toFixed(2); // returns string
}

export function mimeToExtension(type: string): string {
  const mimeMap: Record<string, string> = {
    "application/pdf": "pdf",
    "application/zip": "zip",
    "application/json": "json",
    "text/plain": "txt",
    "text/csv": "csv",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "video/mp4": "mp4",
    "video/webm": "webm",
    // add more if needed...
  };
  return mimeMap[type] || "bin"; // .bin is fallback if the type is not mentioned above
}
