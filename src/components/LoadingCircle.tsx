import { AiOutlineLoading } from 'react-icons/ai';

export default function LoadingCircle() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <AiOutlineLoading className="h-10 w-10 animate-spin" />
    </div>
  );
}
