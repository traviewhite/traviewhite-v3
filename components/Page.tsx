import Head from 'next/head'

interface Props {
  title: string
  children: React.ReactNode
}

const Page = ({ title, children }: Props) => (
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
