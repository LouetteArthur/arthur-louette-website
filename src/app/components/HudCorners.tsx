"use client";

export type CornerPosition = "tl" | "tr" | "bl" | "br";

interface HudCornerProps {
    corners?: CornerPosition[];
    color?: string;
}

export default function HudCorners({
    corners = ["tl", "tr", "bl", "br"],
    color,
}: HudCornerProps) {
    const style = color ? { "--corner-color": color } as React.CSSProperties : undefined;

    return (
        <>
            {corners.map((pos) => (
                <span
                    key={pos}
                    className={`hud-corner hud-corner--${pos}`}
                    style={style}
                    aria-hidden="true"
                />
            ))}
        </>
    );
}
