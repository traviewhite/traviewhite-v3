import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import { fetchEntriesBlog } from 'utils/contentfulPosts'
import { fadeIn, stagger } from 'components/Animations/Motion'

const Blog = ({ blog }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <Page title='Blog'>
      <div className='mb-10 flex justify-center'>Blog Stuff</div>
    </Page>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchEntriesBlog()

  return {
    props: {
      blog: data ?? null,
    },
    revalidate: 1,
  }
}
