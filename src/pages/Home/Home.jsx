import './Home.scss'

const Home = (props) => {
  const { title } = props
  return (
    <div
      className="home"
    >
      <h1>{ title }</h1>
    </div>
  )
}

export default Home