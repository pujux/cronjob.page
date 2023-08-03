import type { GetStaticProps } from "next";
import Main, { ExpressionProps } from "../../components/main";
import { validateExpression } from "../../utils";

const ExpressionHome = Main;

export const getStaticProps: GetStaticProps<ExpressionProps> = () => {
  const expression = "* * * * *";

  return {
    props: validateExpression(expression),
  };
};

export default ExpressionHome;
