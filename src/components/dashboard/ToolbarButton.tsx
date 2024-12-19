import React from "react";
import { type LucideIcon } from 'lucide-react';

interface ToolbarButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}

export function ToolbarButton({ icon: Icon, onClick, children, ariaLabel }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-white bg-blue-500 rounded-md transition-all duration-300 hover:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-white border"
      aria-label={ariaLabel}
    >
      <Icon size={20} aria-hidden="true" />
      <span>{children}</span>
    </button>
  );
}

