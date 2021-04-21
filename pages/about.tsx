import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import { fetchEntriesAbout } from 'utils/contentfulPosts'
import { fadeIn, stagger } from 'components/Animations/Motion'

interface Props {
  about: P
}
interface P {
  image: [{ secure_url: string; width: number; height: number }]
  alt: string
  title: string
  intro: string
  description: string
}

const About: React.FC<Props> = ({ about }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const aboutInfo: P = about[0].fields

  return (
    <Page title='About'>
      <motion.section
        className='mb-10 p-10 sm:p-14 rounded-xl bg-gray-400 dark:bg-gray-800 shadow-lg relative'
        animate='animate'
        initial='initial'
        exit={{ opacity: 0 }}
        variants={stagger}
      >
        <div
          className='bg-gray-700 py-3 w-full rounded-t-xl flex justify-center items-center 
              absolute top-0 left-0'
        >
          <h2
            className='text-gray-400 dark:text-gray-300 font-sans text-base 
              font-bold tracking-widest'
          >
            {aboutInfo.title}
          </h2>
        </div>
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
          <ReactMarkdown children={aboutInfo.description} />
          <div className='flex flex-wrap justify-start'>
            <a href='/Travis White - Resume.pdf' target='_blank' rel='noreferrer'>
              <button
                className='flex mt-8 mr-4 px-6 py-2 font-semibold text-sm rounded-md  
            bg-blue-500 dark:bg-blue-600  hover:bg-blue-600 
            dark:hover:bg-blue-700 hover:shadow-md transition'
              >
                RESUME.pdf
              </button>
            </a>
            <a
              href='https://www.notion.so/deanwilliams/Travis-White-4883c991b5c943b897404e9cc297f69b'
              target='_blank'
              rel='noreferrer'
            >
              <button
                className='flex mt-8 px-6 py-2 font-semibold text-sm rounded-md  
            bg-blue-500 dark:bg-blue-600  hover:bg-blue-600 
            dark:hover:bg-blue-700 hover:shadow-md transition'
              >
                RESUME.notion
              </button>
            </a>
          </div>
          {/* <Social /> */}
        </motion.article>
      </motion.section>
    </Page>
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
