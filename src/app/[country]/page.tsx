"use client";

import { useGetCountriesQuery } from "@/redux/features/countries.slice";
import styled from "styled-components";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { FALLBACK_COUNTRIES_DATA } from "@/meta/country_data";
import { useAppSelector } from "@/lib/hooks";
import { selectOptions } from "@/redux/features/options.slice";

export default function Page({ params }: { params: any }) {
  let { country: countryFromRoute } = params;
  const { data, error } = useGetCountriesQuery("");
  const router = useRouter();
  const options = useAppSelector(selectOptions);

  countryFromRoute = countryFromRoute.replace(/%20/g, " ");

  const selectedCountry = _.find(error ? FALLBACK_COUNTRIES_DATA : data, (country) => {
    return country.name.common.toLowerCase() === countryFromRoute.toString().toLowerCase();
  });

  let nativeNameKeys = Object.keys(selectedCountry.name.nativeName);
  let unknownNnKey = nativeNameKeys[0];
  let nativeName = selectedCountry.name.nativeName[unknownNnKey].official;

  let currenciesKeys = Object.keys(selectedCountry.currencies);
  let unknownCurrKey = currenciesKeys[0];
  let curr = selectedCountry.currencies[unknownCurrKey].name;

  let languages = Object.values(selectedCountry.languages).join(", ");

  let borderCountries: any[] = [];

  if (selectedCountry?.borders?.length >= 1) {
    selectedCountry.borders.map((borderCountry: any) => {
      let foundCountry = _.find(data, (country) => {
        return country.cca3 === borderCountry;
      });
      if (foundCountry) borderCountries.push(foundCountry.name.common);
    });
  }

  return (
    <Style.Container $theme={options.theme}>
      <section>
        <fieldset>
          <button className="back" onClick={() => router.push(`/`)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="back-arrow"
              viewBox="0 0 512 512"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M244 400L100 256l144-144M120 256h292"
              />
            </svg>
            Back
          </button>
        </fieldset>
        <div className="country-container">
          <figure>
            <img alt={selectedCountry.name.common} src={selectedCountry.flags.png} />
          </figure>
          <article>
            <h2>{selectedCountry.name.common}</h2>
            <div className="country-info">
              <p>
                <strong>Native Name:</strong> {nativeName}
              </p>
              <p>
                <strong>Population:</strong> {selectedCountry.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {selectedCountry.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {selectedCountry.subregion}
              </p>
              <p>
                <strong>Capital:</strong> {selectedCountry.capital}
              </p>
              <p>
                <strong>Top Level Domain:</strong> {selectedCountry.tld}
              </p>
              <p>
                <strong>Currencies:</strong> {curr}
              </p>
              <p>
                <strong>Languages:</strong> {languages}
              </p>
            </div>
            {borderCountries.length ? (
              <div className="country-borders">
                <fieldset>
                  <h3>
                    <strong>Border Countries</strong>:
                  </h3>
                  {borderCountries.map((bC) => (
                    <button onClick={() => router.push(`/${bC}`)}>{bC}</button>
                  ))}
                </fieldset>
              </div>
            ) : (
              ""
            )}
          </article>
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
    overflow-y: scroll;
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
        height: unset;
        min-height: 90%;
        overflow-y: scroll;
      }

      .country-container {
        margin-top: 4.5%;
        width: 100%;
        height: 80%;
        display: flex;

        @media (max-width: 769px) {
          height: 90%;
          flex-direction: column;
        }

        figure {
          height: 40svh;
          width: 40%;
          margin-right: 10%;
          display: grid;
          place-items: center;
          position: relative;
          overflow: hidden;

          @media (max-width: 769px) {
            width: 100%;
            height: 30svh;
          }

          img {
            min-width: 100%;
            position: absolute;
            min-height: 100%;

            @media (max-width: 769px) {
              width: 100%;
              height: auto;
              min-height: unset;
            }
          }
        }

        article {
          width: 50%;

          @media (max-width: 769px) {
            width: 100%;
          }

          h2 {
            margin-top: 15px;
            font-size: 24px;
            margin-bottom: 30px;
          }

          p {
            font-weight: 300;
            font-size: 14px;

            @media (max-width: 769px) {
              &:nth-of-type(6) {
                margin-top: 25px;
              }
            }
          }

          .country-info {
            width: 100%;
            display: flex;
            flex-direction: column;
            max-height: 20svh;
            flex-wrap: wrap;

            @media (max-width: 769px) {
              max-height: unset;
            }

            p {
              margin-bottom: 15px;
            }
          }

          .country-borders {
            display: flex;
            width: 100%;
            height: auto;

            @media (max-width: 769px) {
              h3 {
                width: 100%;
                margin-top: 25px;
              }
            }

            fieldset {
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              gap: 10px;
            }

            button {
              font-size: 14px;
              width: max-content;
              padding: 10px 20px;
              background-color: ${(props) =>
                props.$theme === "dark" ? props.theme.dark.lightBackground : props.theme.light.lightBackground};
              color: ${(props) => (props.$theme === "dark" ? props.theme.dark.color : props.theme.light.color)};
              transition: box-shadow 0.25s ease-in, scale 0.25s ease-out, color 0.25s ease-in, background 0.25s ease-out;
              border-radius: 4px;
              &:hover {
                scale: 1.02;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
              }
            }
          }
        }
      }

      fieldset {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        button.back {
          height: 100%;
          padding: 0 2.5%;
          border-radius: 4px;
          background-color: ${(props) =>
            props.$theme === "dark" ? props.theme.dark.lightBackground : props.theme.light.lightBackground};
          color: ${(props) => (props.$theme === "dark" ? props.theme.dark.color : props.theme.light.color)};
          position: relative;
          display: flex;
          align-items: center;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
          transform-origin: center;
          transition: box-shadow 0.25s ease-in, scale 0.25s ease-out, color 0.25s ease-in, background 0.25s ease-out;

          @media (max-width: 769px) {
            padding: 0 7.5%;
          }

          svg.back-arrow {
            height: 45%;
            margin-right: 10px;
          }

          &:hover {
            scale: 1.02;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  `,
};
