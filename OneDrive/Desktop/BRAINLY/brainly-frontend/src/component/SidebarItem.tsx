interface SidebarItemProps {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;   // ✅ allow click
}

export function SidebarItem({ text, icon, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}   // ✅ this must be here
      className="flex items-center w-full px-4 py-2 mt-2 text-gray-700 
                 hover:bg-gray-100 rounded-lg transition-all duration-200"
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
}
