interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <main className='mx-auto pb-16 px-6 max-w-screen-sm'>
      <div className=''>{children}</div>
    </main>
  </>
)

export default Layout
