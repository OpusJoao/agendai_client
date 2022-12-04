import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    console.log(pid)
  }, [pid])

  return <p>Post: {pid}</p>
}

export default Post