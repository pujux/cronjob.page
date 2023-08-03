import Head from "next/head";
import Script from "next/script";

const PageHead = ({ title }: { title?: string }) => (
  <>
    <Head>
      <title>{title ?? "CronJob.Page - Cron Expression Editor"}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />

      <meta name="description" content="Easy to use editor for cron expressions with explanation." />
      <meta name="keywords" content="CronJob, cron expression editor, cron schedule, task scheduling, job scheduling" />
      <meta name="robots" content="index,follow" />

      <meta property="og:url" content="https://cronjob.page" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="CronJob.Page - Cron Expression Editor" />
      <meta property="og:description" content="Easy to use editor for cron expressions with explanation." />
      <meta property="og:image" content="https://cronjob.page/opengraph-image.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="cronjob.page" />
      <meta property="twitter:url" content="https://cronjob.page" />
      <meta name="twitter:title" content="CronJob.Page - Cron Expression Editor" />
      <meta name="twitter:description" content="Easy to use editor for cron expressions with explanation." />
      <meta name="twitter:image" content="https://cronjob.page/opengraph-image.png" />
    </Head>
    <Script async src="https://umami.pufler.dev/script.js" data-website-id="9a350a35-b3d1-42fb-a9f6-4918651f7937" />
  </>
);

export default PageHead;
