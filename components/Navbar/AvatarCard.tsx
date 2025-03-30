import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link"

export default function AvatarCard() {
  return (
    <HoverCard>
      <div className="flex items-center gap-3">
        <img
          className="shrink-0 rounded-full"
          src="https://github.com/Omm2005.png"
          width={40}
          height={40}
          alt="Avatar"
        />
        <div className="space-y-0.5">
          <HoverCardTrigger asChild>
            <div className="text-sm font-medium cursor-pointer">
                <span className="underline">Om Shah</span> <span className="text-xs text-muted-foreground ml-2 no-underline">(Hover it)</span>
            </div>
          </HoverCardTrigger>
          <p className="text-muted-foreground text-xs">@maiommhoon</p>
        </div>
      </div>
      <HoverCardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              className="shrink-0 rounded-full"
              src="https://github.com/Omm2005.png"
              width={40}
              height={40}
              alt="Avatar"
            />
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Om Shah</p>
              <p className="text-muted-foreground text-xs">@maiommhoon</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Student at{" "}
            <strong className="text-foreground font-medium">Moorpark College</strong>.
            Building Robots and other cool shit.
          </p>
          <div className="flex items-center gap-2">
            <Link href={'https://instagram.com/maiommhoon'} className="text-muted-foreground text-xs hover:text-foreground">
            instagram
            </Link>
            <Link href={'https://linkedin.com/in/maiommhoon'} className="text-muted-foreground text-xs hover:text-foreground">
            linkedin
            </Link>
            <Link href={'https://x.com/maiommhoon'} className="text-muted-foreground text-xs hover:text-foreground">
            x.com
            </Link>
            <Link href={'https://modul.so/maiommhoon'} className="text-muted-foreground text-xs hover:text-foreground">
            modul
            </Link>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
