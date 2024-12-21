import { config } from '@/config/config';
import MemoryClient from 'mem0ai';
export const mem0Client = new MemoryClient({ apiKey: config.mem0ai_secret });
