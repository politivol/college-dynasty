type Props = { poll: { question: string; options: { id: string; text: string; votes?: { id: string }[] }[] } };
export function PollCard({ poll }: Props) {
  return (
    <div className="border p-4 space-y-2">
      <h3 className="font-bold">{poll.question}</h3>
      <ul>
        {poll.options.map((o) => (
          <li key={o.id}>{o.text} ({o.votes?.length || 0})</li>
        ))}
      </ul>
    </div>
  );
}
export default PollCard;
