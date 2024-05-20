import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const tLogo: string = '/t_logo.svg'
const tWhiteLogo: string = '/twhite_logo.svg'

const Tnav: React.FC = () => {
  const router = useRouter()

  if (router.route === `/`) {
    return (
      <motion.div
        whileHover={{
          x: 1,
          y: 2,
          transition: { duration: 0.1 },
        }}
        className='py-7 px-16 mr-auto relative'
      >
        <Link href='/'>
          <Image
            src={tWhiteLogo}
            alt='traviewhite T logo'
            // height={60}
            // width={130}
            layout='fill'
            // objectFit='contain'
            // objectPosition='left center'
          />
        </Link>
      </motion.div>
    )
  } else {
    return (
      <motion.div
        whileHover={{
          x: 1,
          y: 2,
          transition: { duration: 0.1 },
        }}
        className='py-7 px-6 mr-auto relative'
      >
        <Link href='/'>
          <Image
            src={tLogo}
            alt='traviewhite T logo'
            // height={60}
            // width={40}
            layout='fill'
            // objectFit='contain'
            // objectPosition='left center'
          />
        </Link>
      </motion.div>
    )
  }
}

export default Tnav
