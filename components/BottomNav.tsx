import Link from 'next/link'
import { useRouter } from 'next/router'
import { Props } from 'components/Links'

const BottomNav: React.FC<Props> = ({ links }) => {
  const router = useRouter()

  return (
    <div className='sm:hidden'>
      <nav className='pb-safe w-full bg-gray-100 border-t dark:bg-gray-900 dark:border-gray-800 fixed bottom-0'>
        <div className='mx-auto px-6 max-w-md h-16 flex items-center justify-around'>
          {links &&
            links.map((link) => (
              <Link key={link.label} href={link.href}>
                <a
                  className={`space-y-1 w-full h-full flex flex-col items-center justify-center ${
                    router.pathname === link.href
                      ? 'text-gray-800 dark:text-indigo-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  }`}
                >
                  {link.icon}
                  <span className='text-xs text-gray-600 dark:text-gray-400'>{link.label}</span>
                </a>
              </Link>
            ))}
        </div>
      </nav>
    </div>
  )
}

export default BottomNav
