import * as React from "react";
import RowContext from "../row//rowContext";
import "./style/index.less";

export type Breakpoint = "lg" | "md" | "sm" | "xs";
export type BreakpointValue = number|Partial<Record<Breakpoint, number>>;

/**
 * Row properties.
 */
export interface IColProps extends React.HTMLAttributes<HTMLDivElement> {
    /** column span, total 12, could be a number or a object like { xs: 8, sm: 16, md: 24} */
    span: BreakpointValue;
    /** column pull, total 12, could be a number or a object like { xs: 8, sm: 16, md: 24} */
    pull?: BreakpointValue;
    /** column push, total 12, could be a number or a object like { xs: 8, sm: 16, md: 24} */
    push?: BreakpointValue;
    /** column offset, total 12, could be a number or a object like { xs: 8, sm: 16, md: 24} */
    offset?: BreakpointValue;
}

const responsiveArray: Breakpoint[] = [ "lg", "md", "sm", "xs"];

/**
 * Col.
 */
export default class Col extends React.Component<IColProps, any> {

    public render() {
      const {children, span, pull, push, offset, ...others} = this.props;

      const classArray: string[] = [
        this.buildCss(span, ""),
        this.buildCss(pull, "pull-"),
        this.buildCss(push, "push-"),
        this.buildCss(offset, "offset-")];
      const className = classArray.filter((x) => x.length > 0).join(" ");

      return (
        <RowContext.Consumer>
        {( gutter ) => {
          let style = others.style;
          if (gutter! > 0) {
            style = {
              paddingLeft: gutter! / 2,
              paddingRight: gutter! / 2,
              ...style,
            };
          }
          return (
            <div {...others} style={style} className={className}>
              {children}
            </div>
          );
        }}
      </RowContext.Consumer>
      );
    }

    private buildCss(css: BreakpointValue, classFragment: string) {
      let cssClass = "";
      const cssArray: string[] = [];
      if (typeof css === "number") {
        cssClass =  `col-md-${classFragment}${css.toString()}`;
      } else if (typeof css === "object") {
        for (let i = 0; i < responsiveArray.length; i++) {
          const size = responsiveArray[i];
          if (css[size] !== undefined) {
            cssArray.push(`col-${size}-${classFragment}${css[size].toString()}`);
          }
        }
        cssClass = cssArray.join(" ");
      }

      return cssClass;
    }

}
