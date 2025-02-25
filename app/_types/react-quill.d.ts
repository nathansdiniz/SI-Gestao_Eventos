declare module "react-quill" {
  import React from "react";

  interface ReactQuillProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    defaultValue?: string;
    readOnly?: boolean;
    theme?: string;
    modules?: any;
    formats?: string[];
    bounds?: string | HTMLElement;
    placeholder?: string;
    tabIndex?: number;
    onChange?: (
      content: string,
      delta: any,
      source: string,
      editor: any,
    ) => void;
    onChangeSelection?: (range: any, source: string, editor: any) => void;
    onFocus?: (range: any, source: string, editor: any) => void;
    onBlur?: (previousRange: any, source: string, editor: any) => void;
    onKeyPress?: React.EventHandler<any>;
    onKeyDown?: React.EventHandler<any>;
    onKeyUp?: React.EventHandler<any>;
    scrollingContainer?: string | HTMLElement;
    preserveWhitespace?: boolean;
  }

  class ReactQuill extends React.Component<ReactQuillProps> {
    focus(): void;
    blur(): void;
    getEditor(): any;
    getEditingArea(): HTMLElement;
    getModule(name: string): any;
  }

  export = ReactQuill;
}
