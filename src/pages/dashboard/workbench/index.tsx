import { createSearchParams, useNavigate } from 'react-router-dom'

function WorkBench() {
  const navigate = useNavigate()

  const go = () => {
    navigate({
      pathname: `/management/system/user/${444444444}`,
      search: createSearchParams({ query: 'someQuery' }).toString(),
    }, {
    })
  }
  return (
    <a onClick={go}>
      router-444444444
    </a>
  )
}

export default WorkBench
