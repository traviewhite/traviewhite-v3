import Head from 'next/head'

interface Props {
  title: string
  children: React.ReactNode
}

const Page: React.FC<Props> = ({ title, children }) => (
  <>
    {title ? (
      <Head>
        <title>{title} / Travis White</title>
      </Head>
    ) : null}

    <div className='py-1'>{children}</div>
  </>
)

export default Page
