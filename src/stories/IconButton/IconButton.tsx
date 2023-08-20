import React from "react";
import "./IconButton.css";
import * as Icons from "react-icons/fa";
import classNames from "classnames";

export type Shape = "circle" | "square";
export type Style = "filled" | "outlined";
export type Color = "primary" | "neutral" | "danger";
export type IconRef = keyof typeof Icons;

interface IconButtonProps {
  color: Color;
  iconRef: IconRef;
  onClick: () => void;
  style: Style;
  shape: Shape;
}

export const IconButton: React.FC<IconButtonProps> = ({
  color,
  iconRef,
  onClick,
  style,
  shape,
}) => {
  const icon = Icons[iconRef]();
  const buttonClasses = classNames("button", {
    rounded: shape === "circle",
    [`outlined ${color}`]: style === "outlined",
    [`filled ${color}`]: style === "filled",
  });
  return (
    <button className={buttonClasses} onClick={onClick}>
      {icon}
    </button>
  );
};
