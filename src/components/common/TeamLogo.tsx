type Props = { abbrev?: string };
export function TeamLogo({ abbrev }: Props) {
  return <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded">{abbrev?.slice(0,3)}</div>;
}
export default TeamLogo;
