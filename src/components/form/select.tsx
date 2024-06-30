import { forwardRef, Ref } from "react";
import styled from "styled-components";

type InputProps = React.InputHTMLAttributes<HTMLSelectElement>;
interface SelectProps extends InputProps {
  children: React.ReactNode;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

export const Select = forwardRef(
  ({ children, width, height, onChange, value, ...props }: SelectProps, ref: Ref<HTMLFieldSetElement>) => {
    return (
      <Style.Container width={width} height={height} ref={ref}>
        <Style.Select onChange={onChange} value={value} height={height} {...props}>
          {children}
        </Style.Select>
      </Style.Container>
    );
  }
);

const Style = {
  Container: styled.fieldset<SelectProps>`
    position: relative;
    display: flex;
    align-items: center;

    &::after {
      content: url("/icons/downSelect.svg");
      position: absolute;
      right: 0.99vw;
      background-color: white;
      border-radius: 50%;
      padding: 0.33vw;
      pointer-events: none;
      height: 55%;
      aspect-ratio: 1 / 1;
    }
  `,
  Select: styled.select<SelectProps>`
    appearance: none;
    text-indent: 1px;
    text-overflow: "";
    -webkit-padding-end: 1.32vw;
    -moz-padding-end: 1.32vw;
    -webkit-padding-start: 0.99vw;
    -moz-padding-start: 0.99vw;
    background-color: white;
    width: 100%;
    box-shadow: 0px 5.19209px 20.7684px rgba(0, 0, 0, 0.1);
    border-radius: 0.53vw;
    font-size: 1.84vh;
    color: rgba(29, 36, 51, 0.8);
    position: relative;
    font-family: "Noir Std";
  `,
};
