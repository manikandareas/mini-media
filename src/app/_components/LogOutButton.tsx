import { LogOut } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function LogOutButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between p-1 text-sm"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </button>
  );
}
