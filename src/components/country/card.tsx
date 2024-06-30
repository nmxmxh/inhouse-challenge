"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { motion, usePresence } from "framer-motion";
import { selectOptions } from "@/redux/features/options.slice";
import { useAppSelector } from "@/lib/hooks";

const transition = { type: "spring", stiffness: 500, damping: 60, mass: 1 };

export function CountryCard({ country }: { country: any }) {
  const router = useRouter();
  const [isPresent, safeToRemove] = usePresence();
  const options = useAppSelector(selectOptions);

  const animations = {
    layout: true,
    initial: "out",
    animate: isPresent ? "in" : "out",
    variants: {
      in: { scale: 1, opacity: 1 },
      out: { scale: 0.95, opacity: 0, zIndex: -1 },
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };

  return (
    <Style.Container $theme={options.theme} {...animations} onClick={() => router.push(`/${country.name.common}`)}>
      <figure>
        <img alt={country.name.common} src={country.flags.png} />
      </figure>
      <div className="country-content">
        <h2>{country.name.common}</h2>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Region</strong>: {country.region}
        </p>
        <p>
          <strong>Capital:</strong> {country?.capital ?? ""}
        </p>
      </div>
    </Style.Container>
  );
}

const Style = {
  Container: styled(motion.button)<{ $theme: "dark" | "light" }>`
    width: 100%;
    height: 40vh;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    transform-origin: center;
    background-color: ${(props) =>
      props.$theme === "dark" ? props.theme.dark.lightBackground : props.theme.light.lightBackground};
    color: ${(props) => (props.$theme === "dark" ? props.theme.dark.color : props.theme.light.color)};
    transition: box-shadow 0.25s ease-in, scale 0.25s ease-out;

    @media (max-width: 769px) {
      aspect-ratio: 1 / 1;
      width: unset;
      margin: auto;
    }

    figure {
      height: 47.5%;
      width: 100%;
      display: grid;
      place-items: center;
      position: relative;
      overflow: hidden;

      img {
        min-width: 100%;
        position: absolute;
        min-height: 100%;
      }
    }

    .country-content {
      padding: 7.5%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h2 {
        font-weight: 800;
        font-size: 18px;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        font-weight: 300;
      }
    }

    &:hover {
      scale: 1.02;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    }
  `,
};
