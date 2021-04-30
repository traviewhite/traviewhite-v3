import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import { fetchEntriesAbout } from 'utils/contentfulPosts'
import { fadeIn, stagger } from 'components/Animations/Motion'

const About = ({ about }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <Page title='About'>
      <div className='mb-10'>
        <AboutContent data={about[0].fields} />
      </div>
    </Page>
  )
}

interface Props {
  data: P
  close?: any
}
interface P {
  image: [{ secure_url: string; width: number; height: number }]
  alt: string
  title: string
  intro: string
  description: string
}

export const AboutContent = ({ data, close }: Props) => {
  const router = useRouter()

  return (
    <motion.section
      className='p-10 sm:p-14 rounded-xl bg-gray-400 dark:bg-gray-800 shadow-lg relative'
      animate='animate'
      initial='initial'
      exit={{ opacity: 0 }}
      variants={stagger}
    >
      <button
        onClick={close}
        className={`absolute p-1 -top-3 -left-3 z-10 ${
          router.route === '/about' ? 'hidden' : 'block'
        } rounded-full  text-red-100 bg-red-500 
        hover:bg-red-600 hover:text-red-200`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
      <Link href='/about'>
        <div
          className='bg-gray-700 py-3 w-full rounded-t-xl flex justify-center items-center 
          absolute top-0 left-0'
        >
          <h2
            className='text-gray-400 dark:text-gray-300 font-sans text-base 
          font-bold tracking-widest'
          >
            {data.title}
          </h2>
        </div>
      </Link>
      {/* <motion.article className='' variants={fadeIn}>
        <Image
          src={aboutInfo.image[0].secure_url}
          alt={aboutInfo.alt}
          height={aboutInfo.image[0].height}
          width={aboutInfo.image[0].width}
          objectFit='cover'
          objectPosition='50% 50%'
        />
      </motion.article> */}
      <motion.article className='mt-12 sm:mt-10' variants={fadeIn}>
        <ReactMarkdown children={data.description} />
        <div className='flex flex-wrap justify-start mt-8'>
          <a
            className='flex m-2 ml-0 px-6 py-2 font-semibold text-sm rounded-md  
        bg-blue-500 dark:bg-blue-600  hover:bg-blue-600 
        dark:hover:bg-blue-700 hover:shadow-md transition'
            href='/Travis White - Resume.pdf'
            target='_blank'
            rel='noreferrer'
          >
            RESUME.pdf
          </a>
          <a
            className='flex m-2 ml-0 px-6 py-2 font-semibold text-sm rounded-md  
        bg-blue-500 dark:bg-blue-600  hover:bg-blue-600 
        dark:hover:bg-blue-700 hover:shadow-md transition'
            href='https://www.notion.so/deanwilliams/Travis-White-4883c991b5c943b897404e9cc297f69b'
            target='_blank'
            rel='noreferrer'
          >
            RESUME.notion
          </a>
        </div>
        {/* <Social /> */}
      </motion.article>
    </motion.section>
  )
}

export default About

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchEntriesAbout()

  return {
    props: {
      about: data ?? null,
    },
    revalidate: 1,
  }
}
