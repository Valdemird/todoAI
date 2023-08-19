import React from "react";
import "./IconButton.css";
import * as Icons from "react-icons/fa";
import classNames from "classnames";

type Shape = "circle" | "square";
type Style = "filled" | "outlined";
type Color = "primary" | "neutral" | "danger";

interface IconButtonProps {
  color: Color;
  iconRef: keyof typeof Icons;
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
