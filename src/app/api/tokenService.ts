import { toast } from 'sonner';

export const getToken = async (feedback: { rateLimit: string; fail: string }, network: string) => {
  try {
    const res = await fetch('/api/get-token');
    if (!res.ok) {
      const errorMessage = res.status === 429 ? feedback.rateLimit : feedback.fail;
      toast.error(errorMessage);
      return null;
    }
    return (await res.json()).token as string;
  } catch {
    toast.error(network);
    return null;
  }
};
