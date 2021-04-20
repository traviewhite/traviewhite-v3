interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => (
  <>
    <main className='mx-auto pt-6 pb-16 px-6 max-w-screen-sm'>
      <div className=''>{children}</div>
    </main>
  </>
)

export default Layout
