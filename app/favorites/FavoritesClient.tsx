"use client";
import { useRouter } from "next/navigation";
import { Container } from "../components";
import Heading from "../components/heading";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listing/listing-card";

interface FavoritesClientProps {
  favorites: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favorites,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          gap-8 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4 
          xl:grid-cols-5
          2xl:grid-cols-6
          "
      >
        {favorites.map((favorite) => (
          <ListingCard
            currentUser={currentUser}
            key={favorite.id}
            data={favorite}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
