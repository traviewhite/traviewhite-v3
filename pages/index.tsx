import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import Page from 'components/Page'
import { fetchEntriesIndex, fetchEntriesIndexFeatured } from 'utils/contentfulPosts'

const Index: React.FC = ({ index, featured }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const introProp = index[0].fields

  return (
    <Page>
      <h1>Hello</h1>
      <IntroContact data={introProp} />
    </Page>
  )
}

interface Props {
  data: P
}
interface P {
  introTitle: string
  introDescription: string
  skillsTitle: string
  skills: [string]
  contactStatus: string
  email: string
}

const IntroContact: React.FC<Props> = ({ data }) => {
  return (
    <section className='mb-10 p-6 sm:p-10 rounded-xl bg-gray-400 dark:bg-gray-800 shadow-lg relative'>
      <div
        className='bg-gray-700 py-3 w-full rounded-t-xl flex justify-center items-center 
          absolute top-0 left-0'
      >
        <h2
          className='text-gray-400 dark:text-gray-300 font-sans text-base 
        font-bold tracking-widest'
        >
          CONTACT ME
        </h2>
      </div>
      <div className='mt-12 sm:mt-10 mx-auto max-w-md text-center font-semibold'>{data.contactStatus}</div>
      <a href={`mailto:${data.email}?Subject=Whats%20up!`}>
        <button
          className='flex mt-8 mx-auto px-6 py-2 font-semibold text-sm rounded-md  
            bg-blue-500 dark:bg-blue-600  hover:bg-blue-600 
            dark:hover:bg-blue-700 hover:shadow-md transition'
        >
          {data.email}
        </button>
      </a>
    </section>
  )
}

export default Index

interface Index {
  fields: {}
}

export const getStaticProps: GetStaticProps = async () => {
  const dataIntro: Index[] | undefined = await fetchEntriesIndex()
  const dataFeatured: Index[] | undefined = await fetchEntriesIndexFeatured()

  return {
    props: {
      index: dataIntro ?? null,
      featured: dataFeatured ?? null,
    },
    revalidate: 1,
  }
}
