import Head from "next/head";

const Title = ({ title }) => {
  return (
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Nova+Round|Varela+Round&display=swap" rel="stylesheet"></link>
      <title>{title}</title>
    </Head>
  );
};

export default Title;