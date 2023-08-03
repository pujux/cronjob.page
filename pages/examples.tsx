import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getRandomCronExpression, slugify, slugifyExample } from "../utils";
import { useRouter } from "next/router";
import PageHead from "../components/page-head";

export const EXAMPLES = {
  "every minute": "* * * * *",
  "every 1 minute": "* * * * *",
  "every 2 minutes": "*/2 * * * *",
  "every even minutes": "*/2 * * * *",
  "every uneven minutes": "1-59/2 * * * *",
  "every 3 minutes": "*/3 * * * *",
  "every 4 minutes": "*/4 * * * *",
  "every five minutes": "*/5 * * * *",
  "every 5 minutes": "*/5 * * * *",
  "every 6 minutes": "*/6 * * * *",
  "every ten minutes": "*/10 * * * *",
  "every 10 minutes": "*/10 * * * *",
  "every fifteen minutes": "*/15 * * * *",
  "every 15 minutes": "*/15 * * * *",
  "every quarter of an hour": "*/15 * * * *",
  "every hour at 15 minutes": "15 * * * *",
  "every hour at 20 minutes": "20 * * * *",
  "every 20 minutes": "*/20 * * * *",
  "every half hour": "*/30 * * * *",
  "every 30 minutes": "*/30 * * * *",
  "every hour at 30 minutes": "30 * * * *",
  "every hour": "0 * * * *",
  hourly: "0 * * * *",
  "every 1 hour": "0 * * * *",
  "every 60 minutes": "0 * * * *",
  "every 2 hours": "0 */2 * * *",
  "every 120 minutes": "0 */2 * * *",
  "every even hour": "0 */2 * * *",
  "every other hour": "0 */2 * * *",
  "every uneven hour": "0 1-23/2 * * *",
  "every three hours": "0 */3 * * *",
  "every 3 hours": "0 */3 * * *",
  "every 4 hours": "0 */4 * * *",
  "every five hours": "0 */5 * * *",
  "every 5 hours": "0 */5 * * *",
  "every 6 hours": "0 */6 * * *",
  "every 8 hours": "0 */8 * * *",
  "every ten hours": "0 */10 * * *",
  "every 10 hours": "0 */10 * * *",
  "every 12 hours": "0 */12 * * *",
  "between certain hours": "0 9-17 * * *",
  "every day": "0 0 * * *",
  daily: "0 0 * * *",
  "once a day": "0 0 * * *",
  "once every day": "0 0 * * *",
  "every day at midnight": "0 0 * * *",
  "every night at midnight ": "0 0 * * *",
  "every night": "0 0 * * *",
  "every day at 1:00": "0 1 * * *",
  "every day at 3:00": "0 3 * * *",
  "every day at 7:00": "0 7 * * *",
  "every morning": "0 9 * * *",
  "every midnight": "0 0 * * *",
  "every monday": "0 0 * * 1",
  "every tuesday": "0 0 * * 2",
  "every wednesday": "0 0 * * 3",
  "every thursday": "0 0 * * 4",
  "every friday": "0 0 * * 5",
  "every friday at night": "0 0 * * 5",
  "every saturday": "0 0 * * 6",
  "every sunday": "0 0 * * 0",
  "every weekday": "0 0 * * 1-5",
  "on weekdays only": "0 0 * * 1-5",
  "monday to friday": "0 0 * * 1-5",
  "every weekend": "0 0 * * 6,0",
  "on weekends only": "0 0 * * 6,0",
  "every week": "0 0 * * 0",
  "every 7 days": "0 0 * * */7",
  weekly: "0 0 * * */7",
  "once every week": "0 0 * * */7",
  "every month": "0 0 1 * *",
  "every other month": "0 0 1 */2 *",
  "every quarter": "0 0 1 */3 *",
  quarterly: "0 0 1 */3 *",
  "every 6 months": "0 0 1 */6 *",
  "every half year": "0 0 1 */6 *",
  "every year": "0 0 1 1 *",
  yearly: "0 0 1 1 *",
  annually: "0 0 1 1 *",
} as { [key: string]: string };

const ExampleHome: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ examples }) => {
  const router = useRouter();

  const halfSize = Math.floor(examples.length / 2);
  const halves = [examples.slice(0, halfSize), examples.slice(halfSize, examples.length)];

  return (
    <div className="text-[rgb(225,225,225)] flex flex-col min-h-screen">
      <PageHead title="Cron Examples - CronJob.Page" />
      <header className="bg-[rgb(33,33,33)] border-b mb-4 border-b-[rgba(255,255,255,0.1)] nunito">
        <div className="p-4 max-w-3xl flex justify-between mx-auto">
          <Link href="/">
            <h1 className="text-3xl font-bold">
              CronJob<span className="hidden sm:inline"> - Schedule Editor</span>
            </h1>
          </Link>
          <button className="underline underline-offset-2 text-lg" onClick={() => router.push(`/cron/${slugify(getRandomCronExpression())}`)}>
            Random
          </button>
        </div>
      </header>
      <main className="px-4 lg:px-8 py-8 flex flex-col max-w-3xl mx-auto gap-12 flex-grow">
        <section>
          <h1 className="text-center text-4xl font-bold min-h-14 nunito">Cron Examples</h1>
          <p className="mt-4 text-center text-xl nunito">
            Simplify your task scheduling with just a click, and find the perfect cron expression that fits your needs effortlessly.
          </p>
        </section>
        <section id="examples" className="grid lg:grid-cols-2 lg:gap-4 sm:px-8">
          {halves.map((half, i) => (
            <div key={i}>
              <ul>
                {half.map((text) => (
                  <li key={text} className="underline underline-offset-2">
                    <a href={`/${slugifyExample(text)}`}>{text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
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

export const getStaticProps = () => {
  return {
    props: { examples: Object.keys(EXAMPLES) },
  };
};

export default ExampleHome;
