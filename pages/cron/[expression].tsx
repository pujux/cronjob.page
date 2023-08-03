import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Main, { ExpressionProps } from "../../components/main";
import { slugify, unslugify, validateExpression } from "../../utils";
import { EXAMPLES } from "../examples";

const Expression: NextPage<ExpressionProps> = (props) => {
  return <Main {...props} />;
};

export const getStaticProps: GetStaticProps<ExpressionProps> = ({ params }) => {
  const expression = unslugify(params!.expression as string);

  return {
    props: validateExpression(expression),
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const expressions = Object.values(EXAMPLES);
  return {
    paths: expressions.map((expression) => ({ params: { expression: slugify(expression) } })),
    fallback: "blocking",
  };
};

export default Expression;
