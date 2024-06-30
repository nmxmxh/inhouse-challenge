"use client";

import { CountryCard } from "@/components/country/card";
import { FALLBACK_COUNTRIES_DATA } from "@/meta/country_data";
import { useGetCountriesQuery } from "@/redux/features/countries.slice";
import { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { LayoutGroup } from "framer-motion";
import { Dropdown } from "@/components/form/dropdown";
import { useAppSelector } from "@/lib/hooks";
import { selectOptions } from "@/redux/features/options.slice";

export default function Page() {
  const { data, error } = useGetCountriesQuery("");
  const [countries, setCountries] = useState<any>([]);
  const [filter, setFilter] = useState("");
  const [region, setRegion] = useState("");
  const options = useAppSelector(selectOptions);

  useEffect(() => {
    if (data) setCountries(data);
    else if (error) setCountries(FALLBACK_COUNTRIES_DATA);

    if (filter || region) {
      let filteredByRegion;
      if (region) {
        filteredByRegion = _.filter(error ? FALLBACK_COUNTRIES_DATA : data, (country: any) => {
          return country.region.toLowerCase() === region.toLowerCase();
        });
      } else filteredByRegion = error ? FALLBACK_COUNTRIES_DATA : data;

      let filterByInput;
      if (filter) {
        filterByInput = _.filter(filteredByRegion, (country: any) => {
          return country.name.common.toLowerCase().includes(filter.toLowerCase());
        });
      } else filterByInput = filteredByRegion;

      setCountries(filterByInput);
    }
  }, [data, filter, region]);

  return (
    <Style.Container $theme={options.theme}>
      <section>
        <fieldset className="search-field">
          <svg
            className="search"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill={options.theme === "dark" ? "white" : "black"}
              d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"
            />
          </svg>
          <input placeholder="Search for a country..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          <Dropdown region={region} setRegion={setRegion} />
        </fieldset>

        <div className="countries-container">
          <LayoutGroup>
            {countries.map((country: any) => (
              <CountryCard key={country.name.common} country={country} />
            ))}
          </LayoutGroup>
        </div>
      </section>
    </Style.Container>
  );
}

const Style = {
  Container: styled.main<{ $theme: "dark" | "light" }>`
    height: 87.5%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
      props.$theme === "dark" ? props.theme.dark.darkBackground : props.theme.light.darkBackground};
    color: ${(props) => (props.$theme === "dark" ? props.theme.dark.color : props.theme.light.color)};
    transition: color 0.25s ease-in, background 0.25s ease-out;

    @media (max-width: 769px) {
      height: 90%;
    }

    section {
      width: var(--width);
      height: 85%;

      @media (max-width: 769px) {
        width: var(--max-width);
        height: 95%;
      }

      .countries-container {
        width: 100%;
        height: 80%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 2vw;
        overflow-y: scroll;
        margin: -10px;
        padding: 10px;
        margin-top: 4.5%;

        @media (max-width: 769px) {
          grid-template-columns: 1fr;
          gap: 4vw;
          overflow-x: hidden;
          margin-top: 7.5%;
        }

        &::-webkit-scrollbar {
          width: 4px;
          border-radius: 2px;
          background: none;
          z-index: 1;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 2px;
          background: var(--darkBlue);
          z-index: 2;
        }
      }

      fieldset.search-field {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 2;

        @media (max-width: 769px) {
          flex-direction: column;
          height: 130px;
        }

        svg.search {
          position: absolute;
          height: 45%;
          z-index: 2;
          left: 3%;

          @media (max-width: 769px) {
            height: 15%;
            top: 12.5%;
            left: 5%;
          }
        }

        input {
          height: 100%;
          width: 35%;
          border-radius: 4px;
          background-color: ${(props) =>
            props.$theme === "dark" ? props.theme.dark.lightBackground : props.theme.light.lightBackground};
          color: ${(props) => (props.$theme === "dark" ? props.theme.dark.color : props.theme.light.color)};
          padding-left: 7.5%;
          outline: none;
          border: 0.5px solid rgba(255, 255, 255, 0);
          opacity: 0.8;
          transition: opacity 0.25s ease-in, border 0.25s ease-out, color 0.25s ease-in, background 0.25s ease-out;

          @media (max-width: 769px) {
            width: 100%;
            padding-left: 15%;
          }

          &::placeholder {
            color: ${(props) => (props.$theme === "dark" ? props.theme.dark.color : props.theme.light.color)};
          }

          &:focus {
            border: 0.5px solid rgba(255, 255, 255, 1);
            opacity: 1;
          }
        }
      }
    }
  `,
};
