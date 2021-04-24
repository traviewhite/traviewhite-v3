import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Modal from 'react-modal'
import { motion } from 'framer-motion'

import Page from 'components/Page'
import { AboutContent } from 'pages/about'
import { fetchEntriesIndex, fetchEntriesIndexFeatured } from 'utils/contentfulPosts'
import { fetchEntriesAbout } from 'utils/contentfulPosts'
import { fadeIn, stagger } from 'components/Animations/Motion'

const Index = ({ index, featured, about }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const introProp = index[0].fields

  return (
    <Page title=''>
      <IntroSection data={introProp} about={about[0].fields} />
      {featured &&
        featured.map((item: { fields: PF; sys: { id: string } }) => (
          <IntroFeatured key={item.sys.id} featured={item.fields} />
        ))}
      <IntroContact data={introProp} />
    </Page>
  )
}

interface Props {
  data: P
  about?: any
  close?: any
}
interface P {
  introTitle: string
  introDescription: string
  skillsTitle: string
  skills: [string]
  contactStatus: string
  email: string
}

const IntroSection = ({ data, about }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false)
  }
  // Modal.setAppElement('#modal-root')
  // useEffect(() => {
  //   const props = {}
  //   ReactDOM.render(<Index {...props} />, document.getElementById('modal-root'))
  // }, [])

  useEffect(() => {
    modalIsOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')
  }, [modalIsOpen])

  return (
    <section className='mb-10 p-6 sm:p-10 rounded-xl bg-gray-400 dark:bg-gray-800 shadow-lg relative'>
      <div
        className='bg-gray-700 py-3 w-full rounded-t-xl flex justify-center items-center 
          absolute top-0 left-0'
      >
        <h2 className='text-gray-400 dark:text-gray-300 font-sans text-base font-bold tracking-widest'>
          {data.introTitle}
        </h2>
      </div>

      <div className='mt-12 sm:mt-10'>
        <div className='flex justify-between flex-col sm:flex-row'>
          <div className='w-full ml-0 mt-5 px-1 sm:mt-2 sm:ml-6 sm:px-0'>
            <ReactMarkdown children={data.introDescription} />
            {/* <Link href='/about'> */}
            <button
              onClick={openModal}
              className='flex mt-8 px-6 py-2 font-semibold text-sm rounded-md  
            bg-blue-500 dark:bg-blue-600  hover:bg-blue-600 
            dark:hover:bg-blue-700 hover:shadow-md transition'
            >
              READ MORE →
            </button>
            <Modal
              className='max-w-xl m-4 rounded-xl'
              overlayClassName='Overlay'
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              contentLabel='modal-root'
            >
              <AboutContent data={about} close={closeModal} />
            </Modal>
            {/* </Link> */}
          </div>
        </div>

        <div className='mt-14 flex justify-center flex-col items-center'>
          <h4 className='mb-4 text-gray-300 font-semibold tracking-tighter'>{data.skillsTitle}</h4>
          <div className='max-w-md flex flex-wrap justify-evenly'>
            {data.skills &&
              data.skills.map((skill: string) => (
                <p
                  className='mb-3 px-3 py-1 bg-yellow-400 rounded-md text-md font-bold text-gray-700 
              border-gray-900 border-2'
                  key={skill}
                >
                  {skill}
                </p>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const IntroContact = ({ data }: Props) => {
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

interface PropsF {
  featured: PF
}
interface PF {
  boxTitle: string
  boxLink: string
  itemLink: string
  image: [{ secure_url: string; width: number; height: number }]
  itemTitle: string
  itemDescription: string
}

const IntroFeatured = ({ featured }: PropsF) => {
  return (
    <section className='mb-10 pt-6 rounded-xl bg-gray-400 dark:bg-gray-800 shadow-lg relative'>
      <div
        className='bg-gray-700 py-3 w-full rounded-t-xl flex justify-center items-center 
          absolute top-0 left-0'
      >
        <Link href={featured.boxLink}>
          <a>
            <h2
              className='text-gray-400 dark:text-gray-300 font-sans text-base 
                        font-bold tracking-widest'
            >
              {featured.boxTitle}
            </h2>
          </a>
        </Link>
      </div>

      <div className=''>
        <div className='mt-6 w-full relative'>
          <Link href={featured.itemLink}>
            <Image
              src={featured.image[0].secure_url}
              alt={featured.itemTitle}
              width={featured.image[0].width}
              height={featured.image[0].height}
              objectFit='cover'
              objectPosition='top center'
            />
          </Link>
        </div>
        <div className='mx-auto p-6 pt-3 sm:p-10 sm:pt-5 '>
          <h3 className='mb-2 tracking-wide'>{featured.itemTitle}</h3>
          <p className='text-gray-300 leading-snug'>{featured.itemDescription}</p>

          <Link href={featured.boxLink}>
            <a>
              <button
                className='flex mt-8 mx-auto px-6 py-2 font-semibold text-sm rounded-md  
            bg-blue-500 dark:bg-blue-600  hover:bg-blue-600 
            dark:hover:bg-blue-700 hover:shadow-md transition'
              >
                VIEW MORE →
              </button>
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const dataIntro = await fetchEntriesIndex()
  const dataFeatured = await fetchEntriesIndexFeatured()
  const dataAbout = await fetchEntriesAbout()

  return {
    props: {
      index: dataIntro ?? null,
      featured: dataFeatured ?? null,
      about: dataAbout ?? null,
    },
    revalidate: 1,
  }
}
