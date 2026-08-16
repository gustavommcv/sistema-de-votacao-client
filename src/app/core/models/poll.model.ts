export interface ApiLink {
  method: string;
  href: string;
}

export interface Poll {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  user_id: number;
  user_email?: string;
  links: Record<string, ApiLink>;
}

export interface PollOption {
  id: number;
  text: string;
  votes_count: number;
}

export interface PollWithOptions extends Poll {
  options: PollOption[];
  user_vote: number | null;
}

export interface CreatePollRequest {
  title: string;
  start_date: string;
  end_date: string;
  options: string[];
}

export interface VoteUpdatedEvent {
  pollId: number;
  options: PollOption[];
}

export type PollStatus = 'not-started' | 'in-progress' | 'finished';

export function getPollStatus(
  poll: Pick<Poll, 'start_date' | 'end_date'>,
  now = new Date(),
): PollStatus {
  if (now < new Date(poll.start_date)) return 'not-started';
  if (now <= new Date(poll.end_date)) return 'in-progress';
  return 'finished';
}
