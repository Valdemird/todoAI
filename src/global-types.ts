type TypographyType = {
  primary: string;
  code: string;
};

type Weight = {
  regular: string;
  bold: string;
  extrabold: string;
  black: string;
};

type Size = {
  s1: number;
  s2: number;
  s3: number;
  m1: number;
  m2: number;
  m3: number;
  l1: number;
  l2: number;
  l3: number;
};

type Typography = {
  type: TypographyType;
  weight: Weight;
  size: Size;
};

type Padding = {
  tiny: number;
  small: number;
  medium: number;
  large: number;
};

type BorderRadius = {
  small: number;
  default: number;
};

type Spacing = {
  padding: Padding;
  borderRadius: BorderRadius;
};

type Color = {
  primary: string;
  neutral1: string;
  neutral2: string;
  neutral3: string;
  danger1: string;
  danger2: string;
};

export type StyleProps = {
  theme: {
    colors: Color;
    spacing: Spacing;
    typography: Typography;
  };
};
