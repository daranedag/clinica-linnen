import {
  AlignCenter,
  Baby,
  Ear,
  Flower2,
  HeartHandshake,
  MessageCircleHeart,
  RefreshCcw,
  ShieldCheck,
  SmilePlus,
  Sparkles,
} from "lucide-react";
import type { IconName } from "@/lib/content/types";

const iconMap = {
  ear: Ear,
  heart: HeartHandshake,
  message: MessageCircleHeart,
  sparkles: Sparkles,
  shield: ShieldCheck,
  smile: SmilePlus,
  align: AlignCenter,
  implant: SmilePlus,
  refresh: RefreshCcw,
  baby: Baby,
  flower: Flower2,
} as const;

export function ClinicIcon({ name, className = "" }: { name: IconName; className?: string }) {
  const Icon = iconMap[name];
  return <Icon aria-hidden="true" strokeWidth={1.7} className={className} />;
}
