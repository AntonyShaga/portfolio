import { toast } from 'sonner';

export const sendMessage = async (
  data: {
    name: string;
    email: string;
    message: string;
  },
  token: string | null,
  feedback: {
    success: string;
    fail: string;
    network: string;
  },
) => {
  try {
    const res = await fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const newToken = res.headers.get('X-New-Token');
      toast.success(feedback.success);
      return { success: true, newToken };
    } else {
      toast.error(feedback.fail);
      return { success: false };
    }
  } catch {
    toast.error(feedback.network);
    return { success: false };
  }
};
