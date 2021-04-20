import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import Page from 'components/Page'
import { fetchEntriesIndex, fetchEntriesIndexFeatured } from 'utils/contentfulPosts'

const Index: React.FC = ({ index, featured }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <Page>
      <h1>Hello</h1>
    </Page>
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
