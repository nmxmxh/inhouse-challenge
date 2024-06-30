import { useAppSelector } from "@/lib/hooks";
import { selectOptions } from "@/redux/features/options.slice";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

export function Dropdown({ region, setRegion }: any) {
  const [showDropdown, setShowDropdown] = useState(false);
  const options = useAppSelector(selectOptions);

  function changeRegion(newRegion: string) {
    if (!region) setRegion(newRegion);
    else if (newRegion === region) setRegion("");
    else setRegion(newRegion);

    setShowDropdown(false);
  }

  return (
    <Style.Container $show={showDropdown} $theme={options.theme}>
      <button onClick={() => setShowDropdown(!showDropdown)}>{!region ? "Filter by Region" : region}</button>
      <svg fill={options.theme === "dark" ? "white" : "black"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" />
      </svg>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: "-15%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "15%" }}
            transition={{ ease: "linear" }}
            className="filter-options"
          >
            <button onClick={() => changeRegion("Africa")}>Africa</button>
            <button onClick={() => changeRegion("Americas")}>Americas</button>
            <button onClick={() => changeRegion("Asia")}>Asia</button>
            <button onClick={() => changeRegion("Europe")}>Europe</button>
            <button onClick={() => changeRegion("Oceania")}>Oceania</button>
          </motion.div>
        )}
      </AnimatePresence>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div<{ $show: boolean; $theme: "dark" | "light" }>`
    height: 100%;
    width: 20%;
    border-radius: 4px;
    position: relative;
    border: 0.5px solid rgba(255, 255, 255, 0);
    opacity: ${({ $show }) => ($show ? 1 : 0.8)};
    z-index: 5;
    background-color: ${(props) =>
      props.$theme === "dark" ? props.theme.dark.lightBackground : props.theme.light.lightBackground};
    color: ${(props) => (props.$theme === "dark" ? props.theme.dark.color : props.theme.light.color)};
    transition: opacity 0.25s ease-in, border 0.25s ease-out, color 0.25s ease-in, background 0.25s ease-out;

    @media (max-width: 769px) {
      width: 50%;
      align-self: flex-start;
      margin-top: 20px;
    }

    button {
      width: 100%;
      height: 100%;
      padding-right: 25%;
      z-index: 6;
    }

    svg {
      position: absolute;
      height: 15%;
      top: 41.5%;
      right: 10%;
    }

    .filter-options {
      position: absolute;
      border-radius: 4px;
      top: 110%;
      width: 100%;
      z-index: 5;
      padding: 10px 0;
      background-color: ${(props) =>
        props.$theme === "dark" ? props.theme.dark.lightBackground : props.theme.light.lightBackground};
      color: ${(props) => (props.$theme === "dark" ? props.theme.dark.color : props.theme.light.color)};

      button {
        height: 35px;
        display: flex;
        align-items: center;
        padding-left: 15%;
      }
    }

    &:focus {
      border: 0.5px solid rgba(255, 255, 255, 1);
      opacity: 1;
    }
  `,
};
