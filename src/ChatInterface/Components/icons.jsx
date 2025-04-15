import React from "react";
import {
  User,
  Send,
  Upload,
  Download,
  Trash,
  File,
  Loader2,
  TrendingUp,
  Smartphone,
  Megaphone,
  Rocket,
  Shield,
  Share2,
} from "lucide-react";

export const Icons = {
  user: User,
  send: Send,
  upload: Upload,
  download: Download,
  trash: Trash,
  file: File,
  spinner: Loader2,

  trendingUp: TrendingUp,
  smartphone: Smartphone,
  megaphone: Megaphone,
  rocket: Rocket,
  shield: Shield,
  share2: Share2,

  solution: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
};

export default Icons;
