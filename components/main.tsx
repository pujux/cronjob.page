import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Croner from "croner";
import { getRandomCronExpression, slugify, unslugify, validateExpression } from "../utils";
import { useEffect, useReducer } from "react";
import Link from "next/link";
import PageHead from "./page-head";

export interface ExpressionProps {
  expression: string;
  expressionExplanation: string;
  nextRuns?: number[];
  runInterval?: number;
}

const Main: NextPage<ExpressionProps & { title?: string }> = ({ expression, expressionExplanation, nextRuns, runInterval, title }) => {
  const router = useRouter();

  const [data, dispatch] = useReducer(
    (state: ExpressionProps, action: { type: string; expression?: string }) => {
      let newState: ExpressionProps = { ...state };
      switch (action.type) {
        case "changeExpression":
          newState = validateExpression(action.expression as string);
          router.push(`/cron/${slugify(newState.expression ?? " ")}`, undefined, { shallow: true });
          break;

        case "increaseRuns":
          const newRuns = Croner(state.expression)
            .nextRuns(5, state.nextRuns ? new Date(state.nextRuns[state.nextRuns.length - 1]) : new Date())
            .map((d) => +d);
          newState = { ...state, nextRuns: [...(state.nextRuns ?? []), ...newRuns] };
          break;
      }
      return newState ?? state;
    },
    { expression, expressionExplanation, nextRuns, runInterval }
  );

  useEffect(() => {
    if (router.query.expression?.includes("/cron/") && router.query.expression !== data.expression) {
      dispatch({
        type: "changeExpression",
        expression: unslugify(router.query.expression as string),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div className="text-[rgb(225,225,225)] flex flex-col min-h-screen">
      <PageHead title={title} />
      <header className="bg-[rgb(33,33,33)] border-b mb-4 border-b-[rgba(255,255,255,0.1)] nunito">
        <div className="p-4 max-w-3xl flex justify-between mx-auto">
          <Link href="/">
            <h1 className="text-3xl font-bold">
              CronJob<span className="hidden sm:inline"> - Schedule Editor</span>
            </h1>
          </Link>
          <button
            className="underline underline-offset-2 text-lg"
            onClick={() =>
              dispatch({
                type: "changeExpression",
                expression: getRandomCronExpression(),
              })
            }
          >
            Random
          </button>
        </div>
      </header>
      <main className="px-4 lg:px-8 py-8 flex flex-col max-w-3xl mx-auto gap-12 flex-grow">
        <section className="flex flex-col items-center gap-4 sm:px-8">
          <label htmlFor="expressionInput" className="sr-only">
            Expression:
          </label>
          <input
            id="expressionInput"
            type="text"
            className="bg-[rgba(225,225,225,0.15)] w-full lg:w-auto lg:min-w-[512px] rounded-lg p-2 text-center tracking-[0.35em] text-3xl"
            value={data.expression}
            onChange={(e) =>
              dispatch({
                type: "changeExpression",
                expression: e.target.value,
              })
            }
          />
          <ul className="flex text-center gap-3 flex-nowrap text-sm">
            <li className={data.expression.trim().replace(/\s+/g, " ").split(" ").length < 6 ? "hidden" : ""}>
              {/* @ts-ignore */}
              <button className="underline cursor-pointer hover:text-[rgba(225,225,225,0.7)]" popovertarget="second-popover">
                second
              </button>
              {/* @ts-ignore */}
              <dialog id="second-popover" className="p-4 bg-[rgb(37,37,37)] text-[rgb(225,225,225)]" popover="auto">
                <table>
                  <tbody>
                    <tr>
                      <th>*</th>
                      <td>any value</td>
                    </tr>
                    <tr>
                      <th>,</th>
                      <td>value list separator</td>
                    </tr>
                    <tr>
                      <th>-</th>
                      <td>range of values</td>
                    </tr>
                    <tr>
                      <th>/</th>
                      <td>step values</td>
                    </tr>
                    <tr>
                      <th>0-59</th>
                      <td>allowed values</td>
                    </tr>
                    <tr>
                      <th>@hourly</th>
                      <td>Run at the start of each hour</td>
                    </tr>
                    <tr>
                      <th>@daily</th>
                      <td> Run every day at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@weekly</th>
                      <td>Run at every Sunday at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@monthly</th>
                      <td>Run on the 1st of each month at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@yearly</th>
                      <td>Run on Jan 1st at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@annually</th>
                      <td>Same as @yearly</td>
                    </tr>
                  </tbody>
                </table>
              </dialog>
            </li>
            <li>
              {/* @ts-ignore */}
              <button className="underline cursor-pointer hover:text-[rgba(225,225,225,0.7)]" popovertarget="minute-popover">
                minute
              </button>
              {/* @ts-ignore */}
              <dialog id="minute-popover" className="p-4 bg-[rgb(37,37,37)] text-[rgb(225,225,225)]" popover="auto">
                <table>
                  <tbody>
                    <tr>
                      <th>*</th>
                      <td>any value</td>
                    </tr>
                    <tr>
                      <th>,</th>
                      <td>value list separator</td>
                    </tr>
                    <tr>
                      <th>-</th>
                      <td>range of values</td>
                    </tr>
                    <tr>
                      <th>/</th>
                      <td>step values</td>
                    </tr>
                    <tr>
                      <th>0-59</th>
                      <td>allowed values</td>
                    </tr>
                    <tr>
                      <th>@hourly</th>
                      <td>Run at the start of each hour</td>
                    </tr>
                    <tr>
                      <th>@daily</th>
                      <td> Run every day at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@weekly</th>
                      <td>Run at every Sunday at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@monthly</th>
                      <td>Run on the 1st of each month at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@yearly</th>
                      <td>Run on Jan 1st at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@annually</th>
                      <td>Same as @yearly</td>
                    </tr>
                  </tbody>
                </table>
              </dialog>
            </li>
            <li>
              {/* @ts-ignore */}
              <button className="underline cursor-pointer hover:text-[rgba(225,225,225,0.7)]" popovertarget="hour-popover">
                hour
              </button>
              {/* @ts-ignore */}
              <dialog id="hour-popover" className="p-4 bg-[rgb(37,37,37)] text-[rgb(225,225,225)]" popover="auto">
                <table>
                  <tbody>
                    <tr>
                      <th>*</th>
                      <td>any value</td>
                    </tr>
                    <tr>
                      <th>,</th>
                      <td>value list separator</td>
                    </tr>
                    <tr>
                      <th>-</th>
                      <td>range of values</td>
                    </tr>
                    <tr>
                      <th>/</th>
                      <td>step values</td>
                    </tr>
                    <tr>
                      <th>0-23</th>
                      <td>allowed values</td>
                    </tr>
                    <tr>
                      <th>@hourly</th>
                      <td>Run at the start of each hour</td>
                    </tr>
                    <tr>
                      <th>@daily</th>
                      <td> Run every day at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@weekly</th>
                      <td>Run at every Sunday at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@monthly</th>
                      <td>Run on the 1st of each month at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@yearly</th>
                      <td>Run on Jan 1st at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@annually</th>
                      <td>Same as @yearly</td>
                    </tr>
                  </tbody>
                </table>
              </dialog>
            </li>
            <li>
              {/* @ts-ignore */}
              <button className="underline cursor-pointer hover:text-[rgba(225,225,225,0.7)]" popovertarget="dom-popover">
                day
              </button>
              <br />
              (month)
              {/* @ts-ignore */}
              <dialog id="dom-popover" className="p-4 bg-[rgb(37,37,37)] text-[rgb(225,225,225)]" popover="auto">
                <table>
                  <tbody>
                    <tr>
                      <th>*</th>
                      <td>any value</td>
                    </tr>
                    <tr>
                      <th>,</th>
                      <td>value list separator</td>
                    </tr>
                    <tr>
                      <th>-</th>
                      <td>range of values</td>
                    </tr>
                    <tr>
                      <th>/</th>
                      <td>step values</td>
                    </tr>
                    <tr>
                      <th>1-31</th>
                      <td>allowed values</td>
                    </tr>
                    <tr>
                      <th>@hourly</th>
                      <td>Run at the start of each hour</td>
                    </tr>
                    <tr>
                      <th>@daily</th>
                      <td> Run every day at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@weekly</th>
                      <td>Run at every Sunday at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@monthly</th>
                      <td>Run on the 1st of each month at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@yearly</th>
                      <td>Run on Jan 1st at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@annually</th>
                      <td>Same as @yearly</td>
                    </tr>
                  </tbody>
                </table>
              </dialog>
            </li>
            <li>
              {/* @ts-ignore */}
              <button className="underline cursor-pointer hover:text-[rgba(225,225,225,0.7)]" popovertarget="month-popover">
                month
              </button>
              {/* @ts-ignore */}
              <dialog id="month-popover" className="p-4 bg-[rgb(37,37,37)] text-[rgb(225,225,225)]" popover="auto">
                <table>
                  <tbody>
                    <tr>
                      <th>*</th>
                      <td>any value</td>
                    </tr>
                    <tr>
                      <th>,</th>
                      <td>value list separator</td>
                    </tr>
                    <tr>
                      <th>-</th>
                      <td>range of values</td>
                    </tr>
                    <tr>
                      <th>/</th>
                      <td>step values</td>
                    </tr>
                    <tr>
                      <th>1-12</th>
                      <td>allowed values</td>
                    </tr>
                    <tr>
                      <th>JAN-DEC</th>
                      <td>alternative single values</td>
                    </tr>
                    <tr>
                      <th>@hourly</th>
                      <td>Run at the start of each hour</td>
                    </tr>
                    <tr>
                      <th>@daily</th>
                      <td> Run every day at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@weekly</th>
                      <td>Run at every Sunday at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@monthly</th>
                      <td>Run on the 1st of each month at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@yearly</th>
                      <td>Run on Jan 1st at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@annually</th>
                      <td>Same as @yearly</td>
                    </tr>
                  </tbody>
                </table>
              </dialog>
            </li>
            <li>
              {/* @ts-ignore */}
              <button className="underline cursor-pointer hover:text-[rgba(225,225,225,0.7)]" popovertarget="dow-popover">
                day
              </button>
              <br />
              (week)
              {/* @ts-ignore */}
              <dialog id="dow-popover" className="p-4 bg-[rgb(37,37,37)] text-[rgb(225,225,225)]" popover="auto">
                <table>
                  <tbody>
                    <tr>
                      <th>*</th>
                      <td>any value</td>
                    </tr>
                    <tr>
                      <th>,</th>
                      <td>value list separator</td>
                    </tr>
                    <tr>
                      <th>-</th>
                      <td>range of values</td>
                    </tr>
                    <tr>
                      <th>/</th>
                      <td>step values</td>
                    </tr>
                    <tr>
                      <th>0-6</th>
                      <td>allowed values</td>
                    </tr>
                    <tr>
                      <th>SUN-SAT</th>
                      <td>alternative single values</td>
                    </tr>
                    <tr>
                      <th>7</th>
                      <td>sunday (non-standard)</td>
                    </tr>
                    <tr>
                      <th>@hourly</th>
                      <td>Run at the start of each hour</td>
                    </tr>
                    <tr>
                      <th>@daily</th>
                      <td> Run every day at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@weekly</th>
                      <td>Run at every Sunday at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@monthly</th>
                      <td>Run on the 1st of each month at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@yearly</th>
                      <td>Run on Jan 1st at midnight UTC</td>
                    </tr>
                    <tr>
                      <th>@annually</th>
                      <td>Same as @yearly</td>
                    </tr>
                  </tbody>
                </table>
              </dialog>
            </li>
          </ul>
        </section>
        <h1 className="text-center text-4xl font-bold min-h-14 nunito leading-snug">“{data.expressionExplanation}“</h1>
        {(data.nextRuns?.length ?? 0) > 0 && (
          <section className="flex flex-col items-center gap-4 sm:px-8">
            <ul className="opacity-70 max-h-96 overflow-auto whitespace-nowrap pr-4">
              {data.nextRuns?.map((run, i) => (
                <li key={run}>
                  {i === 0 ? [<strong key={0}>next</strong>, " at "] : "then at "}
                  {new Date(run).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    hour12: false,
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </li>
              ))}
              <li>
                <button className="underline underline-offset-2 mb-1" onClick={() => dispatch({ type: "increaseRuns" })}>
                  Load more
                </button>
              </li>
            </ul>
          </section>
        )}
      </main>
      <footer className="text-center pb-8 nunito">
        Built by{" "}
        <Link href={"https://pufler.dev"} className="underline underline-offset-2">
          Julian Pufler
        </Link>{" "}
        |{" "}
        <Link href={"/examples"} className="underline underline-offset-2">
          Examples
        </Link>
      </footer>
    </div>
  );
};

export default Main;
