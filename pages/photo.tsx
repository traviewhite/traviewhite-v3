import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import { fetchEntriesBlog } from 'utils/contentfulPosts'
import { fadeIn, stagger } from 'components/Animations/Motion'

const Photo = ({ photo }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <Page title='Photo'>
      <div className='mb-10 flex justify-center'>Photo Stuff</div>
    </Page>
  )
}

export default Photo

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchEntriesBlog()

  return {
    props: {
      photo: data ?? null,
    },
    revalidate: 1,
  }
}
