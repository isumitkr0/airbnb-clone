"use client";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HearButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HearButtonProps> = ({ listingId, currentUser }) => {
  const { toggleFavorite, hasFavorited } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="
        relative 
        cursor-pointer 
        transition 
        hover:opacity-80
        "
    >
      <AiOutlineHeart
        size={28}
        className="
        absolute
        -right-[2px]
        -top-[2px]
        fill-white
      "
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
