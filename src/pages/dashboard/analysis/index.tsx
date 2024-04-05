import { createSearchParams, useNavigate } from 'react-router-dom'

function WorkBench() {
  const navigate = useNavigate()

  const go = () => {
    navigate({
      pathname: `/management/system/user/123123`,
      search: createSearchParams({ query: 'someQuery' }).toString(),
    }, {
    })
  }
  return (
    <a onClick={go}>
      router-123123
    </a>
  )
}

export default WorkBench
