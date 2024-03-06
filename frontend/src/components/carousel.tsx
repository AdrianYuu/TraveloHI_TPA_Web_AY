import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IPromo } from "../interfaces/promo-interface";
import { getPromos } from "../api/api-promo";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
`;

const PromoImage = styled.img`
  max-width: 19rem;
  height: 12rem;
  border-radius: 0.5rem;
`;

const CarouselItem = styled.div`
  display: flex;
  gap: 0.3rem;
  min-width: 80rem;
  justify-content: center;
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  font-size: 7rem;
  cursor: pointer;
`;

const CarouselWrapper = styled.div`
  display: flex;
`;

const CarouselTitle = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: 800;
`;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [promos, setPromos] = useState<IPromo[] | null>(null);

  const fetchPromos = async () => {
    setPromos(await getPromos());
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const goToNextSlide = () => {
    if (promos && promos.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }
  };

  const goToPrevSlide = () => {
    if (promos && promos.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? promos.length - 1 : prevIndex - 1
      );
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "promo"), fetchPromos);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container>
      <CarouselTitle>Promo in TraveloHI</CarouselTitle>
      {promos && promos.length > 0 ? (
        <CarouselWrapper>
          <Button onClick={goToPrevSlide}>{"<"}</Button>
          <CarouselItem>
            {promos.map((promo, index) => {
              const itemIndex = (currentIndex + index) % promos.length;
              return (
                <PromoImage
                  key={promos[itemIndex].ID}
                  src={promos[itemIndex].PromoPictureURL}
                  alt={`Slide ${itemIndex + 1}`}
                />
              );
            })}
          </CarouselItem>
          <Button onClick={goToNextSlide}>{">"}</Button>
        </CarouselWrapper>
      ) : (
        <p style={{ color: "white" }}>
          There are no ongoing promos at the moment.
        </p>
      )}
    </Container>
  );
};

export default Carousel;
