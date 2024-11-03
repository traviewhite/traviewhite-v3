import { useState, useEffect, useCallback } from 'react'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import { client } from 'utils/contentfulPosts'
import { fadeIn, stagger } from 'components/Animations/Motion'
import InView from 'components/Animations/InView'

const Design = ({ design }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const [date, setDate] = useState<number>(2021)

  useEffect(() => {
    const path = router.asPath.split('#')[1]
    if (path) {
      setDate(parseInt(path))
    }
  }, [router.asPath])

  const { data, dataYears } = design

  // 📝 TOGGLE
  // const useToggle = (initial = true) => {
  //   const [option, setOption] = useState<boolean>(initial)
  //   const toggle = useCallback(() => {
  //     setOption((o: any) => !o)
  //   }, [])
  //   return [option, toggle]
  // }
  // const [isOn, toggleIsOn]: any = useToggle()

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

  return (
    <Page title='Design'>
      <motion.ul className='' animate='animate' initial='initial' exit={{ opacity: 0 }} variants={stagger}>
        <div className='mb-6 inline-grid grid-flow-col gap-2'>
          {/* <button onClick={toggleIsOn} className='px-8 py-2 bg-red-500 rounded-lg tracking-wide'>
            ALL
          </button> */}

          <YearsHeader design={dataYears.items} setDate={setDate} />
        </div>

        <DesignContent design={data.items} date={date} />
      </motion.ul>
    </Page>
  )
}

const YearsHeader = ({ design, setDate }: any) => {
  const router = useRouter()

  const currentYear = router.asPath.split('#')[1]
  const isActive = (year: number) => currentYear === year.toString()

  return design && design.length > 0 ? (
    design
      .sort((a: { fields: { year: number } }, b: { fields: { year: number } }) => b.fields.year - a.fields.year)
      .map((y: { fields: { year: any } }, i: any) => {
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
          router.asPath.match(/#([a-z0-9]+)/gi)
        }
        return (
          <Link key={i} href={`#${y.fields.year}`}>
            <p
              className={`px-6 py-1.5 transition rounded-md tracking-wide 
          font-semibold hover:text-gray-100 hover:bg-gray-700
            ${isActive(y.fields.year) ? 'dark:text-gray-100 bg-gray-600' : 'dark:text-gray-300 bg-gray-800'}`}
              onClick={handleClick}
            >
              {y.fields.year}
            </p>
          </Link>
        )
      })
  ) : (
    <p>Error: no years found</p>
  )
}

interface Y {
  fields: { year: number }
  sys: { id: string }
}
const DesignContent = ({ design, date }: any) => {
  return design && design.length > 0 ? (
    design
      // 📝 DO NOT NEED THIS FILTER ANYMORE THANKS TO CONTENTFUL API BUT LEAVING IT BC WHAT IF
      .filter((t: { fields: { title: string } }) => t.fields.title.includes('Design'))
      .sort((a: Y, b: Y) => b.fields.year - a.fields.year)
      .filter((y: Y) => [y.fields.year].includes(date))
      .map((y: Y) => {
        const content = [y.fields].map((c: any) =>
          c.content.map((c: { sys: { id: string }; fields: P }) => (
            <InView>
              <DesignItems key={c.sys.id} data={c.fields} />
            </InView>
          ))
        )
        return (
          <li key={y.sys.id} className=''>
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
}

interface Props {
  data: P
  design?: P
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
  const data = await client.getEntries({
    content_type: 'year',
    'fields.title[match]': 'design',
  })

  const dataYears = await client.getEntries({
    content_type: 'year',
    'fields.title[match]': 'design',
    select: ['sys.id', 'fields.year'],
  })
  return {
    props: {
      design: { data, dataYears } ?? null,
    },
    revalidate: 1,
  }
}
