import Head from "next/head";

const Title = ({ title }) => {
  return (
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <title>{title}</title>
    </Head>
  );
};

export default Title;