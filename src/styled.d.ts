import 'styled-components';

export interface Colors {
    primary:  string;
    neutral1: string;
    neutral2: string;
    neutral3: string;
    danger1:  string;
    danger2:  string;
}

export interface Spacing {
    margin:       Margin;
    padding:      BorderRadius;
    borderRadius: BorderRadius;
}

export interface BorderRadius {
    small:    number;
    medium:   number;
    large:    number;
    default: number;
    tiny:    number;
}

export interface Margin {
    small: number;
}

export interface Typography {
    type:   Type;
    weight: Weight;
    size:   Size;
}

export interface Size {
    s1: number;
    s2: number;
    s3: number;
    m1: number;
    m2: number;
    m3: number;
    l1: number;
    l2: number;
    l3: number;
}

export interface Type {
    primary: string;
    code:    string;
}

export interface Weight {
    regular:   string;
    bold:      string;
    extrabold: string;
    black:     string;
}


declare module 'styled-components' {
  export interface DefaultTheme {
    colors:     Colors;
    spacing:    Spacing;
    typography: Typography;
}
}