
import { SVGProps } from "react";

export function TikTok(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
      <path d="M15 8v8" />
      <path d="M9 12v8" />
      <path d="M15 12a4 4 0 0 0 4-4V4" />
      <path d="M19 8h-4" />
    </svg>
  );
}

export default TikTok;
