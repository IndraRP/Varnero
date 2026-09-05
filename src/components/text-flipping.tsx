"use client";
import { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "./ui/text-flipping-board";

const MESSAGES: string[] = [
  "NO APPROVAL \nNEEDED. \nWEAR YOUR \nOWN RULES.",
  "🖕🏼🖕🏼🖕🏼 VARNERO — WEAR YOUR FUCKING SELF. 🖕🏼🖕🏼🖕🏼",
];

export function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, 9000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20 bg-black">
      <TextFlippingBoard text={MESSAGES[msgIdx]} />
    </div>
  );
}
