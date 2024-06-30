"use client";

import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { changeOptionsState, selectOptions } from "@/redux/features/options.slice";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const options = useAppSelector(selectOptions);
  const dispatch = useAppDispatch();

  function showLightMode() {
    dispatch(
      changeOptionsState({
        ...options,
        theme: "light",
      })
    );
  }

  function showDarkMode() {
    dispatch(
      changeOptionsState({
        ...options,
        theme: "dark",
      })
    );
  }

  return (
    <Style.Container $theme={options.theme}>
      <div className="header-content">
        <h1>Where in the world?</h1>
        <AnimatePresence mode="wait">
          {options.theme === "dark" ? (
            <motion.button
              key="dark-button"
              initial={{ opacity: 0, y: "-15%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "15%" }}
              transition={{ ease: "linear" }}
              onClick={showLightMode}
            >
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z" />
              </svg>
              <p>Light Mode</p>
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: "-15%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "15%" }}
              transition={{ ease: "linear" }}
              key="light-button"
              onClick={showDarkMode}
            >
              <svg preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z" />
              </svg>
              <p>Dark Mode</p>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </Style.Container>
  );
}

export const Style = {
  Container: styled.header<{ $theme: "dark" | "light" }>`
    width: 100%;
    height: 12.5%;
    display: grid;
    place-items: center;
    background-color: ${(props) =>
      props.$theme === "dark" ? props.theme.dark.lightBackground : props.theme.light.lightBackground};
    color: ${(props) => (props.$theme === "dark" ? props.theme.dark.color : props.theme.light.color)};
    transition: color 0.25s ease-in, background 0.25s ease-out;
    position: relative;

    @media (max-width: 769px) {
      height: 10%;
    }

    h1 {
      font-weight: 800;
      font-size: 22px;

      @media (max-width: 769px) {
        font-size: 16px;
      }
    }

    button {
      font-weight: 600;
      display: flex;
      align-items: center;
      padding: 10px 25px;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0);
      border-radius: 4px;
      margin-left: auto;
      transition: box-shadow 0.25s ease-in, scale 0.25s ease-out;
      position: absolute;
      right: 0;

      @media (max-width: 769px) {
        padding: 5px 15px;
        font-size: 14px;
      }

      svg {
        height: 30px;
        margin-right: 10px;

        @media (max-width: 769px) {
          height: 15px;
        }
      }

      &:hover {
        scale: 1.02;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
      }
    }

    div.header-content {
      width: var(--width);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,
};
