import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import { fetchEntriesDesign } from 'utils/contentfulPosts'
import { fadeIn, stagger } from 'components/Animations/Motion'

const Design: React.FC = ({ design }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <Page title='Design'>
      <motion.ul className='' animate='animate' initial='initial' exit={{ opacity: 0 }} variants={stagger}>
        {design && design.length > 0 ? (
          design.map((item: { fields: P; sys: { id: string } }) => <DesignItems key={item.sys.id} data={item.fields} />)
        ) : (
          <p>Nothing to see here</p>
        )}
      </motion.ul>
    </Page>
  )
}

interface Props {
  data: P
}
interface P {
  image: [{ secure_url: string; width: number; height: number }]
  title: string
  description: string
  slug: string
}

const DesignItems: React.FC<Props> = ({ data }) => {
  return (
    <Link href='/design/[slug]' as={`/design/${data.slug}`}>
      <motion.li
        whileHover={{
          scale: 1.005,
          transition: { duration: 0.15 },
        }}
        id={data.slug}
        className='mb-10 rounded-xl bg-gray-400 dark:bg-gray-800 shadow-lg relative cursor-pointer'
        variants={fadeIn}
      >
        <Image
          className='rounded-t-xl'
          src={data.image[0].secure_url}
          alt={data.title}
          width={data.image[0].width}
          height={data.image[0].height}
          objectFit='contain'
        />
        <div className='p-6 pt-3 sm:p-10 sm:pt-5'>
          <h3 className='tracking-normal'>{data.title}</h3>
          <p className='text-gray-400 leading-snug'>{data.description}</p>
        </div>
      </motion.li>
    </Link>
  )
}

export default Design

interface Index {
  fields: []
}

export const getStaticProps: GetStaticProps = async () => {
  const data: Index[] | undefined = await fetchEntriesDesign()

  return {
    props: {
      design: data ?? null,
    },
    revalidate: 1,
  }
}
