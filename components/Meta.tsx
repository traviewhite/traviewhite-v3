import Head from 'next/head'

const Meta = () => (
  <Head>
    <meta charSet='UTF-8' />
    <link hrefLang='en-US' lang='en-US' />

    <title>Travis White</title>

    <meta name='author' content='Travis White' />
    <meta
      name='description'
      content='A personal site for Travis White that hosts everything from current work to thoughts and ideas. Travis White is a front-end software engineer and graphic designer.'
    />
    <meta
      name='keywords'
      content='Travis White, traviswhite, traviewhite, travis, travie, white, web development, front-end, react, developer, graphic design, illustration, printmaking, printmaker, photography, art, design, freelancer'
    />

    {/* google */}
    {/* <meta itemprop='name' content='Travis White' />
    <meta
      itemprop='description'
      content='A personal site for Travis White that hosts everything from current work to thoughts and ideas. Travis White is a front-end software engineer and graphic designer.'
    />
    <meta
      itemprop='image'
      content='http://res.cloudinary.com/twhite/image/upload/v1611333961/traviewhite_web_2021_uro61u.jpg'
    /> */}

    {/* facebook */}
    <meta property='og:url' content='https://traviewhite.com' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content='Travis White' />
    <meta
      property='og:description'
      content='A personal site for Travis White that hosts everything from current work to thoughts and ideas. Travis White is a front-end software engineer and graphic designer.'
    />
    <meta
      property='og:image'
      content='http://res.cloudinary.com/twhite/image/upload/v1611333961/traviewhite_web_2021_uro61u.jpg'
    />
    <meta property='og:site_name' content='Travis White' />
    <meta property='og:url' content='https://traviewhite.com' />

    {/* twitter */}
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:title' content='Travis White' />
    <meta
      name='twitter:description'
      content='A personal site for Travis White that hosts everything from current work to thoughts and ideas. Travis White is a front-end software engineer and graphic designer.'
    />
    <meta
      name='twitter:image'
      content='http://res.cloudinary.com/twhite/image/upload/v1611333961/traviewhite_web_2021_uro61u.jpg'
    />
    <meta name='twitter:url' content='https://traviewhite.com' />
    <meta name='twitter:creator' content='@traviewhite' />

    {/* misc */}
    <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover' />

    <link rel='manifest' href='/manifest.json' />

    <link rel='manifest' href='../favicon/site.webmanifest' />

    <link rel='icon' type='image/png' href='/images/favicon.png' />

    <link rel='apple-touch-icon' href='/images/icon-maskable-512.png' />
    <link rel='apple-touch-icon' sizes='180x180' href='../favicon/apple-touch-icon.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='../favicon/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='../favicon/favicon-16x16.png' />
    <meta name='msapplication-TileColor' content='#da532c' />
    <meta name='theme-color' content='#131313' />

    <meta name='mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
    <meta name='apple-mobile-web-app-title' content='Travis White' />
    <meta name='application-name' content='Travis White' />

    <meta name='format-detection' content='telephone=no' />
    <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
    <meta name='msapplication-tap-highlight' content='no' />

    <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />
    <link rel='shortcut icon' href='/favicon.ico' />
  </Head>
)

export default Meta
