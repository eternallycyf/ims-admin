import { createSearchParams, useNavigate } from 'react-router-dom'

function WorkBench() {
  const navigate = useNavigate()

  const go = () => {
    navigate({
      pathname: `/management/system/user/123123`,
      search: createSearchParams({ query: 'someQuery' }).toString(),
    }, {
      state: {
        tabTitle: '123123',
      },
    })
  }

  const go2 = () => {
    navigate({
      pathname: `/management/system/user/123123`,
      search: createSearchParams({ query: 'replace state' }).toString(),
    }, {
      state: {
        tabTitle: 'replace state',
      },
    })
  }

  return (
    <div>
      <a block="" onClick={go}>
        router-123123
      </a>
      <a block="" onClick={go2}>
        replace state
      </a>
    </div>
  )
}

export default WorkBench
