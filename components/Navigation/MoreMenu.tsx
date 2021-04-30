import { useLayoutEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'

import { Props, P } from 'components/Navigation/Links'

const MoreMenu = ({ links }: Props) => {
  const router = useRouter()

  const useWindowSize = () => {
    const [size, setSize] = useState([0])
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth])
      }
      window.addEventListener('resize', updateSize)
      updateSize()
      return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
  }
  const [width] = useWindowSize()
  const smScreen = 639

  return (
    <div className='block'>
      <Menu as='div' className='relative ml-4'>
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                className='inline-flex justify-center w-full py-1.5 px-3 text-md font-bold
              dark:text-gray-300 dark:hover:text-gray-50 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none focus-visible:ring-2 
              focus-visible:ring-white focus-visible:ring-opacity-75 transition'
              >
                <div className='flex justify-center items-center'>
                  <span className='ml-1'>{width > smScreen ? 'More' : 'Menu'}</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 ml-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items
                static
                className='absolute right-0 z-10 p-2 mt-2 origin-top-right bg-gray-800 divide-y
                divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
              >
                {links &&
                  links.slice(width > smScreen ? 2 : 0).map((link: P) => (
                    <Link key={link.label} href={link.href}>
                      <div className='px-1 py-1'>
                        <Menu.Item>
                          <button
                            className={`transition group flex rounded-md items-center w-full py-1 px-2 text-base 
                              font-semibold tracking-tight
                              ${
                                router.route === link.href
                                  ? 'text-gray-800 dark:text-gray-50'
                                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                              }`}
                          >
                            <span
                              className={`mr-1 ${
                                router.route === link.href ? 'dark:text-indigo-300' : 'dark:text-gray-400'
                              }`}
                            >
                              {link.icon}
                            </span>
                            {link.label}
                          </button>
                        </Menu.Item>
                      </div>
                    </Link>
                  ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

export default MoreMenu
