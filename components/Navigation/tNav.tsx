import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const tLogo: string = '/t_logo.svg'
const tWhiteLogo: string = '/twhite_logo.svg'

const Tnav: React.FC = () => {
  const router = useRouter()
  const isHome = router.route === '/'

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={isHome ? 'home' : 'other'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        whileHover={{
          x: 1,
          y: 2,
          transition: { duration: 0.1 },
        }}
        className={`py-7 ${isHome ? 'px-16' : 'px-6'} mr-auto relative`}
      >
        <Link href='/'>
          <Image src={isHome ? tWhiteLogo : tLogo} alt='traviewhite T logo' layout='fill' />
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}

export default Tnav
