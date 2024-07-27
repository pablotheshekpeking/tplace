import { getSession } from 'next-auth/react';

export async function authorize(req) {
  const session = await getSession({ req });

  if (!session) {
    return false;
  }

  return session;
}
