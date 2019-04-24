import * as Enquire from "enquire.js";
import * as React from "react";
import RowContext from "./rowContext";
import "./style/index.less";

export type Breakpoint = "lg" | "md" | "sm" | "xs";
export type BreakpointMap = Partial<Record<Breakpoint, string>>;

/**
 * Row properties.
 */
export interface IRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** spacing between grids, could be a number or a object like { xs: 8, sm: 16, md: 24} */
    gutter?: number | Partial<Record<Breakpoint, number>>;
}

export interface IRowState {
    screens: BreakpointMap;
  }

const responsiveArray: Breakpoint[] = [ "lg", "md", "sm", "xs"];

const responsiveMap: BreakpointMap = {
  xs: "(max-width: 800px)",
  sm: "(min-width: 1000px)",
  md: "(min-width: 1300px)",
  lg: "(min-width: 1600px)",
};

/**
 * Row.
 */
export default class Row extends React.Component<IRowProps, IRowState> {

    public static defaultProps = {
        gutter: 0,
      };

    public state: IRowState = {
        screens: {},
    };

    public componentDidMount() {
        Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
            Enquire.register(responsiveMap[screen], {
                match: () => {
                  if (typeof this.props.gutter !== "object") {
                    return;
                  }
                  this.setState((prevState) => ({
                    screens: {
                      ...prevState.screens,
                      [screen]: true,
                    },
                  }));
                },
                unmatch: () => {
                  if (typeof this.props.gutter !== "object") {
                    return;
                  }
                  this.setState((prevState) => ({
                    screens: {
                      ...prevState.screens,
                      [screen]: false,
                    },
                  }));
                },
                // Keep a empty destory to avoid triggering unmatch when unregister
                destroy() {
                    return true;
                },
              });
        });
    }

    public componentWillUnmount() {
        Object.keys(responsiveMap).map((screen: Breakpoint) =>
          Enquire.unregister(responsiveMap[screen]),
        );
      }

    public getGutter(): number {
        const {gutter} = this.props;
        if (typeof gutter === "object") {
            for (let i = 0; i < responsiveArray.length; i++) {
              const breakpoint: Breakpoint = responsiveArray[i];
              if (this.state.screens[breakpoint] && gutter[breakpoint] !== undefined) {
                return gutter[breakpoint];
              }
            }
          }
        return gutter as number;
    }

    public renderChildren() {
        const {children, gutter, style, ...otherProps} = this.props;
        const gutterValue = this.getGutter();

        const rowStyle =
      gutter! > 0
        ? {
            marginLeft: gutterValue! / -2,
            marginRight: gutterValue! / -2,
            ...style,
          }
        : style;

        return (
            <RowContext.Provider value={gutterValue}>
              <div className="zw-row" {...otherProps} style={rowStyle}>
                {children}
              </div>
            </RowContext.Provider>
        );
    }

    public render() {
        return this.renderChildren();
    }
}

export {RowContext};
