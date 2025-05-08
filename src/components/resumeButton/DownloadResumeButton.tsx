'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { ToastMessages } from '@/types/dictionary';

interface IProps {
  toastErr: ToastMessages;
}
export default function DownloadResumeButton({ toastErr }: IProps) {
  const { resume, downloadError, error, success, loading } = toastErr;

  const pathname = usePathname();

  const locale = useMemo(() => {
    const parts = pathname.split('/');
    return parts[1] || 'en';
  }, [pathname]);

  const fileNames: Record<string, string> = {
    en: '/resume/Anton-Resume-en.pdf',
    ru: '/resume/Anton-Resume-ru.pdf',
  };

  const fileName = fileNames[locale] || fileNames.en;

  const [loadingSet, setLoadingSet] = useState(false);

  const handleDownload = async () => {
    if (loadingSet) return;

    setLoadingSet(true);
    const toastId = toast.loading(loading);

    try {
      const response = await fetch(fileName);
      if (!response.ok) throw new Error(error);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.split('/').pop()!;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      await new Promise((resolve) => setTimeout(resolve, 700));
      toast.success(success, { id: toastId });
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const errorMessage = error instanceof Error ? error.message : downloadError;
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoadingSet(false);
    }
  };

  return (
    <Button onClick={handleDownload} variant="reverseColor" disabled={loadingSet}>
      {resume}
    </Button>
  );
}
