import { useState, useCallback } from "react";

const STORAGE_KEY = "qalamflow_avatar";

export function useAvatar() {
  const [customAvatar, setCustomAvatarState] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY),
  );

  const uploadAvatar = useCallback((file: File) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const SIZE = 120;
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, SIZE, SIZE);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
      URL.revokeObjectURL(objectUrl);
      localStorage.setItem(STORAGE_KEY, dataUrl);
      setCustomAvatarState(dataUrl);
    };
    img.src = objectUrl;
  }, []);

  const removeAvatar = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCustomAvatarState(null);
  }, []);

  return { customAvatar, uploadAvatar, removeAvatar };
}
