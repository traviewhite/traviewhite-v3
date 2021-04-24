import { useState, useEffect } from 'react'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import { client } from 'utils/contentfulPosts'
import { fadeIn, stagger } from 'components/Animations/Motion'

const Design = ({ design }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const [date, setDate] = useState<number>(2021)

  // 📝 TOGGLE
  // const useToggle = (initial = false) => {
  //   const [option, setOption] = useState<boolean>(initial)
  //   const toggle = useCallback(() => {
  //     setOption((o: any) => !o)
  //   }, [])
  //   return [option, toggle]
  // }
  // const [isOn, toggleIsOn] = useToggle(true)

  // 📝 FIRST TIME FILTERING YEARS USED THIS BUT BC OF LESS CODE I QUERIED FROM CONTENTFUL API
  // const yearsSort: any = design.items
  //   .sort((a: { fields: { year: number } }, b: { fields: { year: number } }) => b.fields.year - a.fields.year)
  //   .map((z: any) => (
  //     <button
  //       onClick={() => setDate(z.fields.year)}
  //       id={z.fields.year}
  //       className='px-6 py-1.5 bg-gray-600 rounded-md text-gray-300 tracking-wide font-semibold hover:text-gray-100 hover:bg-red-600'
  //     >
  //       {z.fields.year}
  //     </button>
  //   ))

  const router = useRouter()
  const years = design.dataY

  const YearsHeader = () =>
    years.items && years.items.length > 0 ? (
      years.items
        .sort((a: { fields: { year: number } }, b: { fields: { year: number } }) => b.fields.year - a.fields.year)
        .map((y: any, i: any) => {
          // useEffect(() => {
          //   router.push(`#${y.fields.year}`, undefined, { shallow: true })
          // }, [])
          // useEffect(() => {
          //   // router.push(`#${y.fields.year}`, undefined, { shallow: true })
          // }, [router.pathname])

          //📝 EXPERIMENTING WITH DIFFERENT SHALLOW ROUTING METHODS TO GET THE YEARS FILTER TO CHANGE COLOR WHEN ACTIVE 😤
          const handleClick = (e: any) => {
            setDate(y.fields.year)
            e.preventDefault()
            router.push(`#${y.fields.year}`, undefined, { shallow: true })
            // router.asPath.match(/#([a-z0-9]+)/gi)
          }
          console.log(y.fields)
          return (
            <Link key={i} href={`#${y.fields.year}`}>
              <a
                className={`px-6 py-1.5 transition rounded-md tracking-wide 
          font-semibold hover:text-gray-100 hover:bg-red-700
            ${
              router.route === `design#${y.fields.year}`
                ? 'dark:text-gray-100 bg-red-600'
                : 'dark:text-gray-300 bg-gray-600'
            }`}
                onClick={(e) => handleClick(e)}
                id={y.fields.year}
              >
                {y.fields.year}
              </a>
            </Link>
          )
        })
    ) : (
      <p>Error: no years found</p>
    )

  const DesignContent = () =>
    design.data.items && design.data.items.length > 0 ? (
      design.data.items
        // 📝 DO NOT NEED THIS FILTER ANYMORE THANKS TO CONTENTFUL API BUT LEAVING IT BC WHAT IF
        .filter((t: any) => t.fields.title.includes('Design'))
        .sort((a: { fields: { year: number } }, b: { fields: { year: number } }) => b.fields.year - a.fields.year)
        .filter((b: any) => [b.fields.year].includes(date))
        .map((y: any, i: any) => {
          const content = [y.fields].map((s: any) =>
            s.content.map((c: any, i: any) => <DesignItems key={i} data={c.fields} />)
          )
          return (
            <li key={i} className=''>
              {/* 📝 DISPLAY CURRENT YEAR AT TOP OF PAGE */}
              {/* <h2 className='px-8 py-2 mx-auto mb-5 bg-red-500 rounded-lg tracking-wide'>{y.fields.year}</h2> */}
              <ul>{content}</ul>
            </li>
          )
        })
    ) : (
      <div className='p-2 flex flex-col justify-center items-center'>
        <p className='text-xl font-mono font-bold'>Nothing to see here </p>
        <p className='mt-4 text-6xl'>😢</p>
      </div>
    )

  return (
    <Page title='Design'>
      <motion.ul className='' animate='animate' initial='initial' exit={{ opacity: 0 }} variants={stagger}>
        <div className='mb-6 inline-grid grid-flow-col gap-2'>
          {/* <button onClick={() => toggleIsOn(!true)} className='px-8 py-2 bg-red-500 rounded-lg tracking-wide'>
            ALL
          </button> */}
          <YearsHeader />
        </div>
        <DesignContent />
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
  year: number
}

const DesignItems = ({ data }: Props) => {
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

export const getStaticProps: GetStaticProps = async () => {
  // have all data for years come in here
  const data = await client.getEntries({
    content_type: 'year',
    'fields.title[match]': 'design',
  })
  // grab the years here
  const dataY = await client.getEntries({
    content_type: 'year',
    'fields.title[match]': 'design',
    select: 'sys.id,fields.year',
  })
  return {
    props: {
      design: { data, dataY } ?? null,
    },
    revalidate: 1,
  }
}
