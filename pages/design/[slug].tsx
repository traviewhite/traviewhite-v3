import { GetStaticProps, GetStaticPaths, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import { fadeIn, stagger } from 'components/Animations/Motion'
import { client } from 'utils/contentfulPosts'

interface Props {
  post: P
  title: string
}
interface P {
  image: [{ secure_url: string; width: number; height: number }]
  title: string
  description: string
  slug: string
}

const DesignPages: React.FC<Props> = ({ post }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter()

  if (!router.isFallback && !post) {
    return <p className='error-404'>404!</p>
  }
  return (
    <Page title={post.title}>
      {router.isFallback ? (
        <p className='loading'>Loading...</p>
      ) : (
        <>
          <div className=''>
            <div className='mb-6 p-6 sm:p-10 rounded-lg bg-gray-400 dark:bg-gray-800 shadow-lg'>
              <h2>{post.title}</h2>
              <div className='design-text-description'>
                <p className='text-gray-400'>{post.description}</p>
                {/* <div className='design-tags'>
                  <p>ROLE: Art Direction</p>
                  <p>YEAR: {post.year}</p>
                </div> */}
              </div>
            </div>
            <motion.div animate='animate' initial='initial' exit={{ opacity: 0 }} variants={stagger}>
              {post.image.map((item: { secure_url: string; width: number; height: number; url: string }, i: any) => (
                <motion.div key={i} variants={fadeIn}>
                  <Image className='' src={item.secure_url} width={item.width} height={item.height} alt={item.url} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </Page>
  )
}

export default DesignPages

interface GetPath {
  items: I[]
}
interface GetProp {
  items: I[]
}
interface I {
  fields: { slug: string }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: GetPath | undefined = await client.getEntries({
    content_type: 'design',
  })
  return {
    paths: data.items.map((item: I) => `/design/${item.fields.slug}`) ?? [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const data: GetProp | undefined = await client.getEntries({
    content_type: 'design',
    'fields.slug': params.slug,
  })

  return {
    props: {
      post: data.items[0].fields ?? null,
    },
    revalidate: 1,
  }
}
