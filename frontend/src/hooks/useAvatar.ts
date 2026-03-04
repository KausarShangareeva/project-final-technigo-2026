import { useState, useCallback } from "react";

const STORAGE_KEY = "qalamflow_avatar";

export function useAvatar() {
  const [customAvatar, setCustomAvatarState] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY),
  );

  const uploadAvatar = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      localStorage.setItem(STORAGE_KEY, dataUrl);
      setCustomAvatarState(dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const removeAvatar = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCustomAvatarState(null);
  }, []);

  return { customAvatar, uploadAvatar, removeAvatar };
}
