import { db } from "../../../server/db";
import PostComposer from "../../../components/feed/PostComposer";
import PostCard from "../../../components/feed/PostCard";
import PollCard from "../../../components/polls/PollCard";

export default async function FeedPage() {
  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });
  const polls = await db.poll.findMany({ include: { options: { include: { votes: true } } }, orderBy: { createdAt: "desc" } });
  return (
    <main className="space-y-4">
      <PostComposer />
      {posts.map((p) => (
        <PostCard key={p.id} post={{ title: p.title, body: p.body || undefined, images: (p.images as string[]) || [] }} />
      ))}
      {polls.map((p) => (
        <PollCard key={p.id} poll={p} />
      ))}
    </main>
  );
}
