import { GetStaticPaths, GetStaticProps, NextPage } from "next/types";
import Main, { ExpressionProps } from "../components/main";
import { slugifyExample, unslugifyExample, validateExpression } from "../utils";
import { EXAMPLES } from "./examples";

const Example: NextPage<ExpressionProps & { title: string }> = (props) => {
  return <Main {...props} />;
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const key = unslugifyExample(params!.example as string);
  if (!(key in EXAMPLES)) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const expression = EXAMPLES[key];

  return {
    props: { ...validateExpression(expression), title: `Run cronjob ${key}` },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: Object.keys(EXAMPLES).map((example) => ({ params: { example: slugifyExample(example) } })),
    fallback: false,
  };
};

export default Example;
