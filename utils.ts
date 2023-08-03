import cronstrue from "cronstrue";
import Croner from "croner";
import { ExpressionProps } from "./components/main";

export function getRandomCronExpression() {
  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const cronParts = [];
  if (rand(1, 20) <= 2) {
    cronParts.push(rand(0, 59)); // Seconds
  }
  cronParts.push(rand(0, 59)); // Minutes
  cronParts.push(rand(0, 23)); // Hours
  cronParts.push(rand(1, 31)); // Day of month
  cronParts.push(rand(1, 12)); // Month
  cronParts.push(rand(0, 6)); // Day of week (0 - 6, where 0 represents Sunday)

  // Apply the pattern like */5 where applicable
  for (let i = 0; i < cronParts.length; i++) {
    if (rand(1, 20) <= 2 && cronParts[i] != 0) {
      cronParts[i] = `*/${cronParts[i]}`;
    }
  }

  return cronParts.join(" ");
}

export function slugify(str: string) {
  return encodeURIComponent(str.replace(/ +/g, " "));
}

export function slugifyExample(str: string) {
  return str.replace(/\s/g, "_");
}

export function unslugify(slug: string) {
  return decodeURIComponent(slug).replace(/_/g, " ");
}

export function unslugifyExample(str: string) {
  return str.replace(/_/g, " ");
}

export function validateExpression(expression: string) {
  const data: ExpressionProps = { expression: expression, expressionExplanation: "Invalid expression" };

  try {
    const croner = Croner(expression.trim());
    data.nextRuns = croner.nextRuns(10).map((d) => +d);
    data.expressionExplanation = cronstrue.toString(croner.getPattern() as string, { verbose: true });
    data.runInterval = data.nextRuns?.[1] - data.nextRuns?.[0];
  } catch (e) {
    //console.error(e);
  }

  return data;
}
